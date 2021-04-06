pub mod maintenance;
pub mod model;
pub mod share;
use crate::{schema::cars, user::DbUser};
use chrono::{NaiveDate, NaiveDateTime};
use diesel::{AsExpression, Associations, Identifiable, Insertable, Queryable};
use diesel_derive_enum::DbEnum;
use model::Model;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
    Serialize,
    Deserialize,
    Associations,
    Insertable,
    Queryable,
    Identifiable,
    AsExpression,
    QueryId,
    AsChangeset,
    PartialEq,
    Debug,
    Eq,
    Clone,
)]
#[table_name = "cars"]
#[belongs_to(Model, foreign_key = "model")]
#[belongs_to(DbUser, foreign_key = "owner")]
#[primary_key(vin)]
pub struct Car {
    vin: String,
    name: Option<String>,
    number_plate: Option<String>,
    kms: i32,
    model: Uuid,
    gearbox: Gearbox,
    car_date: NaiveDate,
    add_date: NaiveDateTime,
    owner: String,
}

#[derive(
    Serialize, Deserialize, Clone, Copy, DbEnum, Debug, PartialEq, Eq, SqlType, AsExpression,
)]
#[postgres(type_name = "gearbox")]
#[DieselType = "Gearboxenum"]
pub enum Gearbox {
    Manual,
    Automatic,
}
