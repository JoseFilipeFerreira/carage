use crate::car::Car;
use chrono::{DateTime, Utc};
use diesel::Queryable;

#[derive(Queryable)]
pub struct Ad {
    car: Car,
    price: f32,
    create_date: DateTime<Utc>,
    update_date: DateTime<Utc>,
}
