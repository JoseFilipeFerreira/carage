pub mod fav_ad;
use crate::{car::Car, schema::ads, user::DbUser};
use chrono::NaiveDateTime;
use diesel::{Associations, Queryable};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
    Associations,
    Serialize,
    Deserialize,
    Queryable,
    Identifiable,
    AsExpression,
    PartialEq,
    Debug,
    Eq,
)]
#[belongs_to(DbUser, foreign_key = "owner")]
#[belongs_to(Car, foreign_key = "car")]
#[table_name = "ads"]
pub struct Ad {
    id: Uuid,
    car: String,
    owner: String,
    price: i32,
    promo_price: Option<i32>,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
}
