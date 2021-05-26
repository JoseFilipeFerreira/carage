use super::{ApiMaintenance, DbMaintenance};
use crate::fairings::Db;
use lazy_static::lazy_static;
use rocket::serde::json::Json;
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

#[post("/create", format = "json", data = "<maint>")]
pub async fn create(conn: Db, maint: Json<ApiMaintenance>) -> Option<Json<DbMaintenance>> {
    conn.run(move |c| DbMaintenance::from_api(maint.clone(), c))
        .await
        .ok()
        .map(Json)
}

//TODO: Error reporting
#[get("/<maint>")]
pub async fn get(
    //_wakey: ApiKey,
    conn: Db,
    maint: String,
) -> Option<Json<DbMaintenance>> {
    if let Ok(maint) = Uuid::parse_str(&maint) {
        match conn.run(move |c| DbMaintenance::get(maint, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}

#[delete("/remove", data = "<maint>")]
pub async fn remove(conn: Db, maint: String) -> Option<Json<DbMaintenance>> {
    if let Ok(maint) = Uuid::parse_str(&maint) {
        match conn.run(move |c| DbMaintenance::delete(maint, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}
