use super::{Ad, ApiAd};
use crate::fairings::{Claims, Db, Page};
use diesel::{associations::HasTable, QueryDsl, RunQueryDsl};
use lazy_static::lazy_static;
use rocket::serde::json::Json;
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

//TODO: Missing some ownership checks
#[post("/create", format = "json", data = "<ad>")]
pub async fn create(conn: Db, _claims: Claims, ad: Json<ApiAd>) -> Option<Json<Ad>> {
    match conn.run(move |c| Ad::from_api(ad.clone(), c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

//TODO: Error reporting
#[post("/", data = "<ad>")]
pub async fn get(conn: Db, ad: String) -> Option<Json<Ad>> {
    if let Ok(ad) = Uuid::parse_str(&ad) {
        match conn.run(move |c| Ad::get(ad, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}

#[post("/all", data = "<page>")]
pub async fn all(conn: Db, page: Json<Page>) -> Option<Json<Vec<Ad>>> {
    match conn
        .run(move |c| {
            Ad::table()
                .offset(page.size * page.page)
                .limit(page.size)
                .get_results(c)
        })
        .await
    {
        Ok(a) => Some(Json(a)),
        _ => None,
    }
}

//TODO: Missing some ownership checks
#[delete("/remove", data = "<ad>")]
pub async fn remove(conn: Db, _claims: Claims, ad: String) -> Option<Json<Ad>> {
    if let Ok(ad) = Uuid::parse_str(&ad) {
        match conn.run(move |c| Ad::delete(ad, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}

#[post("/update", data = "<ad>")]
pub async fn update(conn: Db, claims: Claims, ad: Json<ApiAd>) -> Option<Json<ApiAd>> {
    if ad.id.is_some() {
        conn.run(move |c| {
            Ad::get(ad.id.unwrap(), c)
                .and_then(|db_ad| {
                    if db_ad.owner == claims.email {
                        let up_ad = ad.merge(db_ad);
                        up_ad.update(c)
                    } else {
                        Err(diesel::result::Error::NotFound)
                    }
                })
                .map(ApiAd::from)
        })
        .await
        .map(Json)
        .ok()
    } else {
        None
    }
}
