use super::FavoriteAd;
use crate::fairings::{Claims, Db};
use lazy_static::lazy_static;
use rocket::serde::json::Json;
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![create, remove];
}

#[post("/", data = "<ad>")]
pub async fn create(conn: Db, claims: Claims, ad: String) -> Option<Json<FavoriteAd>> {
    let ad = Uuid::parse_str(&ad).unwrap();
    conn.run(move |c| {
        FavoriteAd {
            ad_id: ad,
            user_id: claims.email,
        }
        .insert(c)
        .ok()
        .map(Json)
    })
    .await
}

#[delete("/", data = "<ad>")]
pub async fn remove(conn: Db, claims: Claims, ad: Json<Uuid>) -> Option<Json<FavoriteAd>> {
    conn.run(move |c| {
        FavoriteAd {
            ad_id: *ad,
            user_id: claims.email,
        }
        .delete(c)
        .ok()
        .map(Json)
    })
    .await
}
