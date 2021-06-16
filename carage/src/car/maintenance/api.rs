use super::{ApiMaintenance, DbMaintenance};
use crate::fairings::{Claims, Db};
use lazy_static::lazy_static;
use rocket::serde::json::Json;
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

//TODO: Check car ownership
//Since the car sharing feature is not implemented yet
//this needs to be fixed later
#[post("/create", format = "json", data = "<maint>")]
pub async fn create(
    conn: Db,
    claims: Claims,
    mut maint: Json<ApiMaintenance>,
) -> Option<Json<DbMaintenance>> {
    maint.owner = claims.email;
    conn.run(move |c| DbMaintenance::from_api(maint.clone(), c))
        .await
        .ok()
        .map(Json)
}

//TODO: Error reporting
#[get("/<maint>")]
pub async fn get(conn: Db, maint: String) -> Option<Json<DbMaintenance>> {
    if let Ok(maint) = Uuid::parse_str(&maint) {
        match conn.run(move |c| DbMaintenance::get(&maint, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}

#[delete("/remove", data = "<maint>")]
pub async fn remove(conn: Db, claims: Claims, maint: String) -> Option<Json<DbMaintenance>> {
    if let Ok(maint) = Uuid::parse_str(&maint) {
        conn.run(move |c| {
            DbMaintenance::get(&maint, c)
                .ok()
                .filter(|m| m.owner == claims.email)
                .map(|_m| DbMaintenance::delete(&maint, c).ok().map(Json))
        })
        .await
        .unwrap_or(None)
    } else {
        None
    }
}

#[post("/update", data = "<maint>")]
pub async fn update(
    conn: Db,
    claims: Claims,
    maint: Json<ApiMaintenance>,
) -> Option<Json<DbMaintenance>> {
    if maint.id.is_some() {
        conn.run(move |c| {
            if let Ok(maintenance) = DbMaintenance::get(&maint.id.unwrap(), c) {
                if maintenance.owner == claims.email {
                    let upmain = maint.merge(maintenance);
                    upmain.update(c).ok()
                } else {
                    None
                }
            } else {
                None
            }
        })
        .await
        .map(Json)
    } else {
        None
    }
}
