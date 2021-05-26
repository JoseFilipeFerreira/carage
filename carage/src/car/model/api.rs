use super::Model;
use crate::fairings::Db;
use diesel::{associations::HasTable, ExpressionMethods, QueryDsl, RunQueryDsl};
use lazy_static::lazy_static;
use rocket::serde::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![make, models];
}

#[get("/make")]
pub async fn make(conn: Db) -> Option<Json<Vec<String>>> {
    match conn
        .run(move |c| {
            Model::table()
                .select(crate::schema::models::make)
                .distinct()
                .get_results(c)
        })
        .await
    {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

//TODO: Error reporting
#[get("/models", data = "<make>")]
pub async fn models(
    //_wakey: ApiKey,
    conn: Db,
    make: String,
) -> Option<Json<Vec<Model>>> {
    match conn
        .run(|c| {
            Model::table()
                .filter(crate::schema::models::make.eq(make))
                .distinct()
                .get_results(c)
        })
        .await
    {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}
