#[macro_use]
extern crate diesel;
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_sync_db_pools;
pub mod ad;
pub mod car;
pub mod fairings;
pub mod schema;
pub mod user;
use crate::ad::api::ROUTES as AD_ROUTES;
use crate::car::{
    api::ROUTES as CAR_ROUTES, maintenance::api::ROUTES as MAINT_ROUTES,
    model::api::ROUTES as MODEL_ROUTES,
};
use crate::user::api::ROUTES as USER_ROUTES;

#[launch]
pub fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![fairings::cors])
        .mount("/user", USER_ROUTES.to_vec())
        .mount("/car", CAR_ROUTES.to_vec())
        .mount("/ad", AD_ROUTES.to_vec())
        .mount("/car/model", MODEL_ROUTES.to_vec())
        .mount("/car/maintenance", MAINT_ROUTES.to_vec())
        .attach(fairings::Cors())
        .attach(fairings::Db::fairing())
}
