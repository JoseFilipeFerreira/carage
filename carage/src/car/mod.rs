pub mod api;
pub mod maintenance;
pub mod model;
pub mod share;
use crate::{schema::cars, user::DbUser};
use chrono::{NaiveDate, NaiveDateTime};
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryDsl, Queryable, RunQueryDsl,
};
use diesel_derive_enum::DbEnum;
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
    owner: String,
}

impl Car {
    pub fn new(
        other_vin: String,
        other_name: Option<String>,
        other_number_plate: Option<String>,
        other_kms: i32,
        other_model: Uuid,
        other_gearbox: Gearbox,
        other_car_date: NaiveDate,
        other_owner: String,
    ) -> Self {
        Car {
            vin: other_vin,
            name: other_name,
            number_plate: other_number_plate,
            kms: other_kms,
            model: other_model,
            gearbox: other_gearbox,
            car_date: other_car_date,
            add_date: chrono::Utc::now().naive_utc(),
            owner: other_owner,
        }
    }

    pub fn new_and_insert(
        other_vin: String,
        other_name: Option<String>,
        other_number_plate: Option<String>,
        other_kms: i32,
        other_model: Uuid,
        other_gearbox: Gearbox,
        other_car_date: NaiveDate,
        other_owner: String,
        conn: &PgConnection,
    ) -> Result<Self, diesel::result::Error> {
        let car = Car {
            vin: other_vin,
            name: other_name,
            number_plate: other_number_plate,
            kms: other_kms,
            model: other_model,
            gearbox: other_gearbox,
            car_date: other_car_date,
            add_date: chrono::Utc::now().naive_utc(),
            owner: other_owner,
        };
        diesel::insert_into(Self::table())
            .values(&car)
            .get_result(conn)
    }

    pub fn from_api(car: ApiCar, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(Self::table())
            .values(Self::from(car))
            .get_result(conn)
    }

    pub fn update(&self, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::update(Self::table()).set(self).get_result(conn)
    }

    pub fn delete(car: String, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::delete(Self::table().find(car)).get_result(conn)
    }

    pub fn get(car: String, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        Self::table().find(car).first(conn)
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct ApiCar {
    vin: String,
    name: Option<String>,
    number_plate: Option<String>,
    kms: i32,
    model: Uuid,
    gearbox: Gearbox,
    car_date: NaiveDate,
    owner: String,
}

impl From<ApiCar> for Car {
    fn from(other: ApiCar) -> Self {
        Self {
            vin: other.vin,
            name: other.name,
            number_plate: other.number_plate,
            kms: other.kms,
            model: other.model,
            gearbox: other.gearbox,
            car_date: other.car_date,
            add_date: chrono::Utc::now().naive_utc(),
            owner: other.owner,
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
