use super::{ApiCar, Car};
use crate::DB;
use lazy_static::lazy_static;
use rocket_contrib::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

#[put("/create", format = "json", data = "<car>")]
pub async fn create(conn: DB, car: Json<ApiCar>) -> Option<Json<Car>> {
    match conn.run(move |c| Car::from_api(car.clone(), c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

//TODO: Error reporting
#[post("/", data = "<car>")]
pub async fn get(
    //_wakey: ApiKey,
    conn: DB,
    car: String,
) -> Option<Json<Car>> {
    match conn.run(|c| Car::get(car, c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

#[delete("/remove", data = "<car>")]
pub async fn remove(conn: DB, car: String) -> Option<Json<Car>> {
    match conn.run(move |c| Car::delete(car, c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}
