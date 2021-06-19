pub mod api;
use crate::{car::Car, schema::files};
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryDsl, QueryResult, Queryable, RunQueryDsl,
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
    AsChangeset,
    PartialEq,
    Debug,
    Eq,
    QueryId,
    Clone,
)]
#[table_name = "files"]
#[primary_key(id)]
#[belongs_to(Car, foreign_key = "car_id")]
pub struct File {
    pub id: Uuid,
    pub filename: String,
    pub car_id: String,
}

impl File {
    pub fn insert(&self, conn: &PgConnection) -> QueryResult<Self> {
        diesel::insert_into(Self::table())
            .values(self)
            .get_result(conn)
    }

    pub fn get(id: Uuid, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        Self::table().find(id).first(conn)
    }

    pub fn delete(id: Uuid, conn: &PgConnection) -> QueryResult<Self> {
        diesel::delete(Self::table().find(id)).get_result(conn)
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct FileApi {
    pub filename: String,
    pub car_id: String,
    pub image: String,
}
