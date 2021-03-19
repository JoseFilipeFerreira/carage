use chrono::{DateTime, Utc};
use diesel::Queryable;

#[derive(Queryable)]
pub struct Maintenance {
    cost: f32,
    date: DateTime<Utc>,
    kms: u64,
    inserted_date: DateTime<Utc>,
    files: Option<String>, //TODO: Study better aproach
}
