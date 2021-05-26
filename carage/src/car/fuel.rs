use chrono::{DateTime, Utc};
use diesel::Queryable;

#[derive(Queryable)]
pub struct Fuel {
    cost: f32,
    date: DateTime<Utc>,
    kms: u64,
    liters: f32,
    files: Option<String>, //TODO: Study better aproach
}
