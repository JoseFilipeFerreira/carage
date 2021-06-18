use super::{File, FileApi};
use crate::fairings::{Claims, Db};
use base64;
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
    // TODO: get path from db via id
    let id = Uuid::parse_str(&id).unwrap();
    let path = match conn.run(move |c| File::get(id, c)).await {
        Ok(f) => Some(f.filename),
        _ => None,
    }?;
    NamedFile::open(Path::new("images/").join(path)).await.ok()
}

#[post("/create", data = "<img>")]
pub async fn create(
    conn: Db,
    img: Json<FileApi>,
    _claims: Claims,
    limits: &Limits,
) -> Result<Json<File>, std::io::Error> {
    let id = Uuid::new_v4();
    let path = Path::new("images/").join(id.to_string());
    let bytes = base64::decode(img.image.clone())
        .map_err(|_| io::Error::new(io::ErrorKind::InvalidInput, "Invalid base64 format"))?;

    if bytes.len() > limits.get("file/image").unwrap_or_else(|| 10.mebibytes()) {
        Err(io::Error::new(io::ErrorKind::InvalidInput, "Image too big"))
    } else {
        let mut image_file = fs::File::create(path)?;
        image_file.write(&bytes);
        Ok(id.to_string())
    }?;

    let db_entry = File {
        id,
        filename: img.filename.clone(),
        car_id: img.car_id.clone(),
    };
    conn.run(move |c| db_entry.insert(c))
        .await
        .map(Json)
        .map_err(|_| io::Error::new(io::ErrorKind::InvalidInput, "Invalid base64 format"))
}

#[delete("/remove/<car_id>/<id>")]
pub async fn remove(_conn: Db, id: String, car_id: String, _claims: Claims) -> io::Result<()> {
    // TODO: get path from db via id
    let path = id;
    //TODO: delete entry from database
    fs::remove_file(Path::new("images/").join(path))
}
