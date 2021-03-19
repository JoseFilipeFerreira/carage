use crate::{ad::Ad, car::Car};
use chrono::{DateTime, Utc};
use diesel::Queryable;

#[derive(Queryable)]
pub struct User {
    email: String,
    passwd: String,
    my_cars: Vec<Car>,
    shared_cars: Vec<Car>,
    ads: Vec<Ad>,
    create_date: DateTime<Utc>,
    update_date: DateTime<Utc>,
}
