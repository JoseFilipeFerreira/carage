pub mod api;
use crate::schema::maintenance;
use chrono::{NaiveDate, NaiveDateTime};
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryDsl, Queryable, RunQueryDsl,
};
use diesel_derive_enum::DbEnum;
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
#[belongs_to(DbUser, foreign_key = owner)]
#[belongs_to(Car, foreign_key = car)]
#[table_name = "maintenance"]
pub struct DbMaintenance {
    id: Uuid,
    kms: i32,
    price: i32,
    type_: Type, //files: Option<String>, //TODO: Study better aproach
    description: Option<String>,
    car: String,
    owner: String,
    date: NaiveDate,
    created_date: NaiveDateTime,
}

#[derive(
    Clone, Copy, DbEnum, Debug, PartialEq, Eq, SqlType, AsExpression, Serialize, Deserialize,
)]
#[postgres(type_name = "type")]
#[DieselType = "Typeenum"]
pub enum Type {
    Manual,
    Automatic,
}

impl DbMaintenance {
    pub fn from_api(
        maintenance: ApiMaintenance,
        conn: &PgConnection,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(Self::table())
            .values(Self::from(maintenance))
            .get_result(conn)
    }

    pub fn update(&self, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::update(Self::table()).set(self).get_result(conn)
    }

    pub fn delete(id: &Uuid, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::delete(Self::table().find(id)).get_result(conn)
    }

    pub fn get(id: &Uuid, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        Self::table().find(id).first(conn)
    }
}

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug, Clone)]
pub struct ApiMaintenance {
    kms: i32,
    price: i32,
    type_: Type, //files: Option<String>, //TODO: Study better aproach
    description: Option<String>,
    car: String,
    owner: String,
    date: NaiveDate,
}

impl From<ApiMaintenance> for DbMaintenance {
    fn from(other: ApiMaintenance) -> Self {
        Self {
            id: Uuid::new_v4(),
            kms: other.kms,
            price: other.price,
            type_: other.type_, //files: Option<String>, //TODO: Study better aproach
            description: other.description,
            car: other.car,
            owner: other.owner,
            date: other.date,
            created_date: chrono::Utc::now().naive_utc(),
        }
    }
}
