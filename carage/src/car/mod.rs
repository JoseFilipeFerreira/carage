pub mod fuel;
pub mod maintenance;
pub mod model;
pub mod post;
use crate::user::User;
use chrono::{Date, DateTime, Utc};
use diesel::Queryable;
use model::Model;
use post::Post;

//TODO: Figure Out how to store car costs
#[derive(Queryable)]
pub struct Car {
    name: Option<String>,
    kms: u64,
    number_plate: String,
    vin: String,
    model: Model,
    car_date: Date<Utc>,
    add_date: DateTime<Utc>,
    feed: Vec<Post>,
    shared_with: Option<Vec<User>>,
    owner: User,
}
