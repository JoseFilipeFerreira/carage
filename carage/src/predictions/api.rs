use super::Prediction;
use crate::{car::SendCar, fairings::Db};
use lazy_static::lazy_static;
use rocket::serde::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get];
}

//TODO: Error reporting
#[post("/", data = "<car>")]
pub async fn get(conn: Db, car: String) -> Option<Json<Prediction>> {
    match conn.run(move |c| SendCar::get(&car, c)).await {
        Ok(u) => Some(Json(Prediction::predict(u.car, u.model).await)),
        _ => None,
    }
}
