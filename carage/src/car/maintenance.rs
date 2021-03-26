use crate::schema::maintenance;
use chrono::{NaiveDate, NaiveDateTime};
use diesel::Queryable;
use diesel_derive_enum::DbEnum;
use uuid::Uuid;

#[derive(Insertable, Queryable, Identifiable, AsExpression, PartialEq, Debug, Eq)]
#[table_name = "maintenance"]
pub struct Maintenance {
    id: Uuid,
    price: i32,
    date: NaiveDate,
    kms: i32,
    created_date: NaiveDateTime,
    type_: Type, //files: Option<String>, //TODO: Study better aproach
    car: String,
    owner: String,
}

#[derive(Clone, Copy, DbEnum, Debug, PartialEq, Eq, SqlType, AsExpression)]
#[sql_type = "Type"]
#[postgres(type_name = "type")]
pub enum Type {
    Manual,
    Automatic,
}
