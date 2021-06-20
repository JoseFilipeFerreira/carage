use super::{File, FileApi};
use crate::{
    car::Car,
    fairings::{Claims, Db},
};
use lazy_static::lazy_static;
use rocket::serde::json::Json;
use rocket::{
    data::{Limits, ToByteUnit},
    fs::NamedFile,
};
use std::{
    fs,
    io::{self, Write},
    path::Path,
};
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

#[get("/<id>")]
pub async fn get(conn: Db, id: String) -> Option<NamedFile> {
    let id = Uuid::parse_str(&id).unwrap();
    let path = match conn.run(move |c| File::get(id, c)).await {
        Ok(f) => Some(f.id),
        _ => None,
    }?;
    NamedFile::open(Path::new("images/").join(format!("{}", path)))
        .await
        .ok()
}

#[post("/create", data = "<img>")]
pub async fn create(
    conn: Db,
    img: Json<FileApi>,
    claims: Claims,
    limits: &Limits,
) -> Result<Json<File>, std::io::Error> {
    let limits = limits.clone();
    conn.run(move |c| {
        let car = Car::get(&img.car_id, c).unwrap();
        if car.owner == claims.email {
            let id = Uuid::new_v4();
            let path = Path::new("images/").join(id.to_string());
            let bytes = image_base64::from_base64(img.image.clone());

            if bytes.len() > limits.get("file/image").unwrap_or_else(|| 10.mebibytes()) {
                Err(io::Error::new(io::ErrorKind::InvalidInput, "Image too big"))
            } else {
                let mut image_file = fs::File::create(path)?;
                image_file.write_all(&bytes)
            }?;

            let db_entry = File {
                id,
                filename: img.filename.clone(),
                car_id: img.car_id.clone(),
            };
            db_entry
                .insert(c)
                .map_err(|_| io::Error::new(io::ErrorKind::InvalidInput, "Invalid base64 format"))
        } else {
            Err(io::Error::new(io::ErrorKind::InvalidInput, "Image too big"))
        }
    })
    .await
    .map(Json)
    .map_err(|_| io::Error::new(io::ErrorKind::InvalidInput, "Invalid base64 format"))
}

#[delete("/remove/<img>")]
pub async fn remove(conn: Db, claims: Claims, img: String) -> Option<Json<File>> {
    if let Ok(id) = Uuid::parse_str(&img) {
        match conn
            .run(move |c| {
                let file = File::get(id, c)?;
                let car = Car::get(&file.car_id, c)?;
                if car.owner == claims.email {
                    let f = File::delete(id, c);
                    fs::remove_file(Path::new("images/").join(img.clone()))
                        .map_err(|_| diesel::result::Error::NotFound)?;
                    f
                } else {
                    Err(diesel::result::Error::NotFound)
                }
            })
            .await
        {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}
