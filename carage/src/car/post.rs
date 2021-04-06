use crate::{car::Car, user::User};
use chrono::{DateTime, Utc};
use diesel::Queryable;

#[derive(Identifiable, Queryable)]
pub struct Post {
    description: String,
    files: Option<String>,
    date: DateTime<Utc>,
    creator: User,
    car: Car,
}
