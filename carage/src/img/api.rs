use crate::fairings::{Claims, Db};
use super::{FileApi, File};
use lazy_static::lazy_static;
use rocket::{
    data::{Data, Limits, ToByteUnit},
    fs::NamedFile,
};
use std::{
    fs, io,
    path::{Path, PathBuf},
};
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

#[get("/<id>")]
pub async fn get(conn: Db, id: String) -> Option<NamedFile> {
    // TODO: get path from db via id
    let path = match conn.run(move |c| File::get(&id, c)).await {
        Ok(f) => Some(f.filename),
        _ => None,
    }?;
    NamedFile::open(Path::new("images/").join(path)).await.ok()
}

#[post("/create", data = "<img>")]
pub async fn create(
    _conn: Db,
    img: Json<FileApi>,
    _claims: Claims,
    limits: &Limits,
) -> Result<String, std::io::Error> {
    let id = Uuid::new_v4();
    let path = Path::new("images/").join(id.to_string()).join(
        Path::new(&img.filename)
            .extension()
            .ok_or(io::ErrorKind::InvalidInput)?,
    );
    //TODO: insert id, path and car_id into db
    //TODO: convert to file
    img.image.open(limits.get("file/image").unwrap_or_else(|| 10.mebibytes()))
        .into_file(path)
        .await?;
    Ok(id.to_string())
}

#[delete("/remove/<car_id>/<id>")]
pub async fn remove(_conn: Db, id: String, car_id: String, _claims: Claims) -> io::Result<()> {
    // TODO: get path from db via id
    let path = id;
    //TODO: delete entry from database
    fs::remove_file(Path::new("images/").join(path))
}
