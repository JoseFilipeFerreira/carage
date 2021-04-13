use crate::schema::maintenance;
use chrono::{NaiveDate, NaiveDateTime};
use diesel::{Associations, Queryable};
use diesel_derive_enum::DbEnum;
use uuid::Uuid;

#[derive(Associations, Insertable, Queryable, Identifiable, AsExpression, PartialEq, Debug, Eq)]
#[belongs_to(DbUser, foreign_key = owner)]
#[belongs_to(Car, foreign_key = car)]
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
