use super::{ApiUser, DbUser, User};
use crate::DB;
use lazy_static::lazy_static;
use rocket_contrib::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove];
}

#[post("/create", format = "json", data = "<user>")]
pub async fn create(conn: DB, user: Json<ApiUser>) -> Option<Json<DbUser>> {
    match conn.run(move |c| DbUser::from_api(user.clone(), c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

//TODO: Error reporting
#[post("/", data = "<email>")]
pub async fn get(
    //_wakey: ApiKey,
    conn: DB,
    email: String,
) -> Option<Json<User>> {
    match conn.run(|c| User::get(email, c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

#[delete("/remove", data = "<user>")]
pub async fn remove(conn: DB, user: String) -> Option<Json<DbUser>> {
    match conn.run(move |c| DbUser::delete(user, c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}
