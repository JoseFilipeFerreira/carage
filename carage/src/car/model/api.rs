use super::{Model, ModelDetails};
use crate::fairings::Db;
use diesel::{associations::HasTable, ExpressionMethods, QueryDsl, RunQueryDsl};
use lazy_static::lazy_static;
use rocket::serde::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![make, models, variant];
}

//TODO: Discuss if users can submit car models
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

#[post("/models", data = "<make>")]
pub async fn models(conn: Db, make: String) -> Option<Json<Vec<String>>> {
    match conn
        .run(|c| {
            Model::table()
                .filter(crate::schema::models::make.eq(make))
                .select(crate::schema::models::model)
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
#[post("/variant", data = "<make>")]
pub async fn variant(conn: Db, make: Json<ModelDetails>) -> Option<Json<Vec<Model>>> {
    match conn
        .run(move |c| {
            Model::table()
                .filter(crate::schema::models::make.eq(dbg!(make.make.clone())))
                .filter(crate::schema::models::model.eq(dbg!(make.model.clone())))
                .distinct()
                .get_results::<Model>(c)
        })
        .await
    {
        Ok(u) => Some(Json(u)),
        Err(a) => {
            dbg!(a);
            None
        }
    }
}
