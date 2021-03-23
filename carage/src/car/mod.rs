pub mod fuel;
pub mod maintenance;
pub mod model;
pub mod post;
use crate::schema::cars;
use chrono::{NaiveDate, NaiveDateTime};
use diesel::{AsExpression, Identifiable, Insertable, Queryable};
use diesel_derive_enum::DbEnum;

//TODO: Figure Out how to store car costs
#[derive(Insertable, Queryable, Identifiable, AsExpression, PartialEq, Debug, Eq)]
#[table_name = "cars"]
#[primary_key(vin)]
pub struct Car {
    name: Option<String>,
    kms: i32,
    number_plate: String,
    gearbox: Gearbox,
    vin: String,
    model: String,
    car_date: NaiveDate,
    add_date: NaiveDateTime,
    owner: String,
}

#[derive(Clone, Copy, DbEnum, Debug, PartialEq, Eq, SqlType, AsExpression)]
#[sql_type = "Gearbox"]
#[postgres(type_name = "gearbox")]
pub enum Gearbox {
    Manual,
    Automatic,
}
