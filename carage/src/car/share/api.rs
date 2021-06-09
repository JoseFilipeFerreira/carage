use super::{super::Car, CarShare};
use crate::fairings::{Claims, Db};
use lazy_static::lazy_static;
use rocket::serde::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![create, remove];
}

#[post("/", format = "json", data = "<share>")]
pub async fn create(conn: Db, claims: Claims, share: Json<CarShare>) -> Option<Json<CarShare>> {
    conn.run(move |c| {
        if let Ok(carr) = Car::get(&share.car, c) {
            if carr.owner == claims.email {
                share.insert(c).ok().map(Json)
            } else {
                None
            }
        } else {
            None
        }
    })
    .await
}

#[delete("/", data = "<share>")]
pub async fn remove(conn: Db, claims: Claims, share: Json<CarShare>) -> Option<Json<CarShare>> {
    conn.run(move |c| {
        if let Ok(carr) = Car::get(&share.car, c) {
            if carr.owner == claims.email {
                share.delete(c).ok().map(Json)
            } else {
                None
            }
        } else {
            None
        }
    })
    .await
}
