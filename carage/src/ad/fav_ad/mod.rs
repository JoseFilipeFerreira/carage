pub mod api;
use super::Ad;
use crate::schema::favorite_ads;
use crate::user::DbUser;
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
#[table_name = "favorite_ads"]
#[primary_key(ad_id, user_id)]
#[belongs_to(DbUser, foreign_key = "user_id")]
#[belongs_to(Ad)]
pub struct FavoriteAd {
    pub ad_id: Uuid,
    pub user_id: String,
}

impl FavoriteAd {
    pub fn insert(&self, conn: &PgConnection) -> QueryResult<Self> {
        diesel::insert_into(Self::table())
            .values(self)
            .get_result(conn)
    }

    pub fn delete(&self, conn: &PgConnection) -> QueryResult<Self> {
        diesel::delete(self).get_result(conn)
    }
}
