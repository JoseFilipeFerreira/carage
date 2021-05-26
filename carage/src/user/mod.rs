pub mod api;
use crate::{
    ad::Ad,
    car::{share::CarShare, Car},
    schema::users::{self, dsl::*},
};
use chrono::NaiveDateTime;
use diesel::{
    associations::HasTable, BelongingToDsl, PgConnection, QueryDsl, Queryable, RunQueryDsl,
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

impl DbUser {
    pub fn new(other_email: String, other_name: String, other_passwd: String) -> Self {
        DbUser {
            email: other_email,
            name: other_name,
            passwd: other_passwd,
            create_date: chrono::Utc::now().naive_utc(),
            update_date: chrono::Utc::now().naive_utc(),
        }
    }

    pub fn new_and_insert(
        other_email: String,
        other_name: String,
        other_passwd: String,
        conn: &PgConnection,
    ) -> Result<Self, diesel::result::Error> {
        let u = DbUser {
            email: other_email,
            name: other_name,
            passwd: other_passwd,
            create_date: chrono::Utc::now().naive_utc(),
            update_date: chrono::Utc::now().naive_utc(),
        };
        diesel::insert_into(users).values(&u).get_result(conn)
    }

    pub fn from_api(user: ApiUser, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(users)
            .values(Self::from(user))
            .get_result(conn)
    }

    pub fn update(&self, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::update(DbUser::table()).set(self).get_result(conn)
    }

    pub fn delete(user: String, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::delete(DbUser::table().find(user)).get_result(conn)
    }
}

impl From<User> for DbUser {
    fn from(user: User) -> Self {
        DbUser {
            email: user.email,
            name: user.name,
            passwd: user.passwd,
            create_date: user.create_date,
            update_date: user.update_date,
        }
    }
}

impl From<ApiUser> for DbUser {
    fn from(user: ApiUser) -> Self {
        DbUser {
            email: user.email,
            name: user.name,
            passwd: user.passwd,
            create_date: chrono::Utc::now().naive_utc(),
            update_date: chrono::Utc::now().naive_utc(),
        }
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct ApiUser {
    email: String,
    name: String,
    passwd: String,
}

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug)]
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
        Self::from_db(DbUser::table().find(other_email).first(conn)?, conn)
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

    pub fn check_passwd(&self, password: &str) -> bool {
        self.passwd == password
    }
}

#[derive(Serialize, Deserialize, PartialEq, Eq, Clone, Debug)]
pub struct UserCreds {
    pub email: String,
    pub password: String,
}
