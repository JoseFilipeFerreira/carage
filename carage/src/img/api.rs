use crate::fairings::{Claims, Db};
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
pub async fn get(_conn: Db, id: String) -> Option<NamedFile> {
    // TODO: get path from db via id
    let path = id;
    NamedFile::open(Path::new("images/").join(path)).await.ok()
}

#[post("/create/<filename>", data = "<img>")]
pub async fn create(
    _conn: Db,
    filename: PathBuf,
    img: Data,
    _claims: Claims,
    limits: &Limits,
) -> Result<String, std::io::Error> {
    let id = Uuid::new_v4();
    let path = Path::new("images/").join(id.to_string()).join(
        filename
            .as_path()
            .extension()
            .ok_or(io::ErrorKind::InvalidInput)?,
    );
    //TODO: insert id and path into db
    img.open(limits.get("file/image").unwrap_or_else(|| 10.mebibytes()))
        .into_file(path)
        .await?;
    Ok(id.to_string())
}

#[delete("/remove/<id>")]
pub async fn remove(_conn: Db, id: String, _claims: Claims) -> io::Result<()> {
    // TODO: get path from db via id
    let path = id;
    //TODO: delete entry from database
    fs::remove_file(Path::new("images/").join(path))
}
