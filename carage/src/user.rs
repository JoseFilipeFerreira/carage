use crate::{
    ad::Ad,
    car::{share::CarShare, Car},
    schema::{
        ads::dsl::*,
        car_shares::dsl::*,
        cars::dsl::*,
        users::{self, dsl::*},
    },
};
use chrono::NaiveDateTime;
use diesel::{
    associations::HasTable, BelongingToDsl, PgConnection, QueryDsl, Queryable, RunQueryDsl,
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
    AsChangeset,
)]
#[table_name = "users"]
#[primary_key(email)]
pub struct DbUser {
    email: String,
    name: String,
    passwd: String,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
}

pub struct User {
    email: String,
    name: String,
    passwd: String,
    my_cars: Vec<Car>,
    shared_cars: Vec<CarShare>,
    ads: Vec<Ad>,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
}

impl User {
    pub fn get(other_email: String, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        Self::from_db(DbUser::table().find(email).first(conn)?, conn)
    }

    pub fn from_db(dbuser: DbUser, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        let my_cars = Car::belonging_to(&dbuser).load(conn)?;
        let shared_cars = CarShare::belonging_to(&dbuser).load(conn)?;
        let other_ads = Ad::belonging_to(&dbuser).load(conn)?;
        Ok(User {
            email: dbuser.email,
            name: dbuser.name,
            passwd: dbuser.passwd,
            my_cars,
            shared_cars,
            ads: other_ads,
            create_date: dbuser.create_date,
            update_date: dbuser.update_date,
        })
    }
}
