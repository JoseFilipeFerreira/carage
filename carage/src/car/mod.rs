pub mod api;
pub mod maintenance;
pub mod model;
pub mod share;
use crate::{schema::cars, user::DbUser};
use chrono::{NaiveDate, NaiveDateTime};
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryDsl, QueryResult, Queryable, RunQueryDsl,
};
use diesel_derive_enum::DbEnum;
use model::Bodytype;
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
    pub owner: String,
    body_type: Bodytype,
}

impl Car {
    pub fn from_api(car: ApiCar, conn: &PgConnection) -> QueryResult<Self> {
        diesel::insert_into(Self::table())
            .values(Self::from(car))
            .get_result(conn)
    }

    pub fn update(&self, conn: &PgConnection) -> QueryResult<Self> {
        diesel::update(Self::table()).set(self).get_result(conn)
    }

    pub fn delete(car: &str, conn: &PgConnection) -> QueryResult<Self> {
        diesel::delete(Self::table().find(car)).get_result(conn)
    }

    pub fn get(car: &str, conn: &PgConnection) -> QueryResult<Self> {
        Self::table().find(car).first(conn)
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct ApiCar {
    vin: String,
    name: Option<String>,
    number_plate: Option<String>,
    kms: Option<i32>,
    model: Option<Uuid>,
    gearbox: Option<Gearbox>,
    car_date: Option<NaiveDate>,
    owner: Option<String>,
    body_type: Option<Bodytype>,
}

impl ApiCar {
    pub fn merge(&self, other: Car) -> Car {
        Car {
            vin: other.vin,
            name: self.name.clone().or(other.name),
            number_plate: self.number_plate.clone().or(other.number_plate),
            kms: self.kms.unwrap_or(other.kms),
            model: other.model,
            gearbox: self.gearbox.unwrap_or(other.gearbox),
            car_date: self.car_date.unwrap_or(other.car_date),
            add_date: other.add_date,
            owner: other.owner,
            body_type: self.body_type.unwrap_or(other.body_type),
        }
    }
}

impl From<ApiCar> for Car {
    fn from(other: ApiCar) -> Self {
        Self {
            vin: other.vin,
            name: other.name,
            number_plate: other.number_plate,
            kms: other.kms.unwrap(),
            model: other.model.unwrap(),
            gearbox: other.gearbox.unwrap(),
            car_date: other.car_date.unwrap(),
            add_date: chrono::Utc::now().naive_utc(),
            owner: other.owner.unwrap(),
            body_type: other.body_type.unwrap(),
        }
    }
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
