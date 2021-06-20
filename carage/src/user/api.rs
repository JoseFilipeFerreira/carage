use super::{ApiUser, DbUser, User, UserCreds};
use crate::fairings::{Claims, Db};
use diesel::{associations::HasTable, QueryDsl, RunQueryDsl};
use jsonwebtoken::{encode, EncodingKey, Header};
use lazy_static::lazy_static;
use rocket::serde::json::Json;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> =
        routes![get, create, remove, login, smol_get, update];
}

#[post("/create", format = "json", data = "<user>")]
pub async fn create(conn: Db, user: Json<ApiUser>) -> Option<Json<DbUser>> {
    match conn.run(move |c| DbUser::from_api(user.clone(), c)).await {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

#[get("/")]
pub async fn get(conn: Db, claims: Claims) -> Option<Json<User>> {
    match conn.run(move |c| User::get(&claims.email, c)).await {
        Ok(mut u) => {
            u.passwd = "[REDACTED]".to_owned();
            Some(Json(u))
        }
        _ => None,
    }
}

#[get("/smol")]
pub async fn smol_get(conn: Db, claims: Claims) -> Option<Json<UserCreds>> {
    match conn.run(move |c| User::get(&claims.email, c)).await {
        Ok(u) => Some(Json(UserCreds {
            email: u.name,
            passwd: "[REDACTED]".to_owned(),
        })),
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
    let clone_passwd = creds.passwd.clone();
    let clone_email = creds.email.clone();
    if let Ok(user) = conn.run(move |c| User::get(&creds.email.clone(), &c)).await {
        if user.check_passwd(&clone_passwd) {
            let claims = Claims { email: clone_email };
            Some(Json(
                encode(
                    &Header::default(),
                    &claims,
                    &EncodingKey::from_secret(b"secret".as_ref()),
                )
                .unwrap(),
            ))
        } else {
            None
        }
    } else {
        None
    }
}

#[post("/update", data = "<user>")]
pub async fn update(conn: Db, user: Json<ApiUser>, claims: Claims) -> Option<Json<DbUser>> {
    conn.run(move |c| {
        if user.email == claims.email {
            DbUser::table()
                .find(claims.email)
                .first(c)
                .and_then(|dbuser| user.clone().merge(dbuser).update(&c))
                .ok()
        } else {
            None
        }
    })
    .await
    .map(Json)
}
