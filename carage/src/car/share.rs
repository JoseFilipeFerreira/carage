use super::Car;
use crate::{schema::car_shares, user::DbUser};
use diesel::{AsExpression, Associations, Identifiable, Insertable, Queryable};
use serde::{Deserialize, Serialize};

#[derive(
    Associations,
    Serialize,
    Deserialize,
    Insertable,
    Queryable,
    Identifiable,
    AsExpression,
    PartialEq,
    Debug,
    Eq,
)]
#[table_name = "car_shares"]
#[belongs_to(Car, foreign_key = "car")]
#[belongs_to(DbUser, foreign_key = "share_user")]
#[primary_key(car, share_user)]
pub struct CarShare {
    car: String,
    share_user: String,
}
