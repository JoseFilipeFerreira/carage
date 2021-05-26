use super::{Ad, ApiAd};
use crate::fairings::Db;
use lazy_static::lazy_static;
use rocket::serde::json::Json;
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

#[post("/create", format = "json", data = "<ad>")]
pub async fn create(conn: Db, ad: Json<ApiAd>) -> Option<Json<Ad>> {
    match conn.run(move |c| Ad::from_api(ad.clone(), c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

//TODO: Error reporting
#[post("/", data = "<ad>")]
pub async fn get(
    //_wakey: ApiKey,
    conn: Db,
    ad: String,
) -> Option<Json<Ad>> {
    if let Ok(ad) = Uuid::parse_str(&ad) {
        match conn.run(move |c| Ad::get(ad, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}

#[delete("/remove", data = "<ad>")]
pub async fn remove(conn: Db, ad: String) -> Option<Json<Ad>> {
    if let Ok(ad) = Uuid::parse_str(&ad) {
        match conn.run(move |c| Ad::delete(ad, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}
