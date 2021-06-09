pub mod api;
use super::Car;
use crate::{schema::car_shares, user::DbUser};
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryResult, Queryable, RunQueryDsl,
};
use serde::{Deserialize, Serialize};

#[derive(
    Serialize,
    Deserialize,
    Associations,
    Insertable,
    Queryable,
    Identifiable,
    AsExpression,
    QueryId,
    PartialEq,
    Debug,
    Eq,
    Clone,
)]
#[table_name = "car_shares"]
#[belongs_to(Car, foreign_key = "car")]
#[belongs_to(DbUser, foreign_key = "share_user")]
#[primary_key(car, share_user)]
pub struct CarShare {
    pub car: String,
    pub share_user: String,
}

impl CarShare {
    pub fn insert(&self, conn: &PgConnection) -> QueryResult<Self> {
        diesel::insert_into(Self::table())
            .values(self)
            .get_result(conn)
    }

    pub fn delete(&self, conn: &PgConnection) -> QueryResult<Self> {
        diesel::delete(self).get_result(conn)
    }
}
