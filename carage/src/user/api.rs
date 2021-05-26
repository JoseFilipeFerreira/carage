use super::{ApiUser, DbUser, User, UserCreds};
use crate::fairings::{Claims, Db};
use jsonwebtoken::{encode, EncodingKey, Header};
use lazy_static::lazy_static;
use rocket::serde::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove, login];
}

#[post("/create", format = "json", data = "<user>")]
pub async fn create(conn: Db, user: Json<ApiUser>) -> Option<Json<DbUser>> {
    match conn.run(move |c| DbUser::from_api(user.clone(), c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

//TODO: Error reporting
#[post("/", data = "<email>")]
pub async fn get(
    conn: Db,
    email: String,
) -> Option<Json<User>> {
    match conn.run(|c| User::get(email, c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

#[delete("/remove")]
pub async fn remove(conn: Db, claims: Claims) -> Option<Json<DbUser>> {
    match conn.run(move |c| DbUser::delete(claims.email, c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

#[post("/login", data = "<creds>")]
pub async fn login(conn: Db, creds: Json<UserCreds>) -> Option<Json<String>> {
    let clone_passwd = creds.password.clone();
    let clone_email = creds.email.clone();
    if let Ok(user) = conn.run(move |c| User::get(creds.email.clone(), &c)).await {
        if user.check_passwd(&clone_passwd) {
            let claims = Claims { email: clone_email };
            Some(Json(
                encode(
                    &Header::default(),
                    &claims,
                    &EncodingKey::from_secret("secret".as_ref()),
                )
                .unwrap(),
            ))
        } else {
            None
        };
    }
    None
