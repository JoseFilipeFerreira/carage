pub mod api;
use crate::{car::Car, schema::files};
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryResult, Queryable, RunQueryDsl,
};
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
    PartialEq,
    Debug,
    Eq,
    QueryId,
)]
#[table_name = "files"]
#[primary_key(id, car_id)]
#[belongs_to(Car, foreign_key = "car_id")]
pub struct File {
    pub id: Uuid,
    pub filename: String,
    pub car_id: String,
}

pub struct FileApi {
    pub filename: String,
    pub car_id: String,
}
