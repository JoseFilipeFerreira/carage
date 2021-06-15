pub mod api;
use crate::{car::Car, schema::files};
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryResult, Queryable, RunQueryDsl, QueryDsl,
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
)]
#[table_name = "files"]
#[primary_key(id, car_id)]
#[belongs_to(Car, foreign_key = "car_id")]
pub struct File {
    pub id: Uuid,
    pub filename: String,
    pub car_id: String,
}

impl File {
    pub fn from_api(file: FileApi, conn: &PgConnection) -> QueryResult<Self> {
        diesel::insert_into(Self::table())
            .values(file)
            .get_result(conn)
    }

    pub fn update(&self, conn: &PgConnection) -> QueryResult<Self> {
        diesel::update(Self::table()).set(self).get_result(conn)
    }

    pub fn delete(file: &str, conn: &PgConnection) -> QueryResult<Self> {
        diesel::delete(Self::table().find(file)).get_result(conn)
    }

    pub fn get(file: &str, conn: &PgConnection) -> QueryResult<Self> {
        Self::table().find(file).first(conn)
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug, Insertable)]
pub struct FileApi {
    pub filename: String,
    pub car_id: String,
}
