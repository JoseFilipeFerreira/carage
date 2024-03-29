pub mod api;
use crate::{
    ad::{fav_ad::FavoriteAd, Ad, FullAd},
    car::{share::CarShare, Car, SendCar},
    schema::users::{self, dsl::*},
};
use chrono::NaiveDateTime;
use diesel::{
    associations::HasTable, BelongingToDsl, ExpressionMethods, PgConnection, QueryDsl, Queryable,
    RunQueryDsl,
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
    Clone,
    QueryId,
    AsChangeset,
)]
#[table_name = "users"]
#[primary_key(email)]
pub struct DbUser {
    email: String,
    name: String,
    pub passwd: String,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
    phone: Option<i32>,
}

impl DbUser {
    pub fn new(
        other_email: String,
        other_name: String,
        other_passwd: String,
        other_phone: Option<i32>,
    ) -> Self {
        DbUser {
            email: other_email,
            name: other_name,
            passwd: other_passwd,
            phone: other_phone,
            create_date: chrono::Utc::now().naive_utc(),
            update_date: chrono::Utc::now().naive_utc(),
        }
    }

    pub fn new_and_insert(
        other_email: String,
        other_name: String,
        other_passwd: String,
        other_phone: Option<i32>,
        conn: &PgConnection,
    ) -> Result<Self, diesel::result::Error> {
        let u = DbUser {
            email: other_email,
            name: other_name,
            passwd: other_passwd,
            phone: other_phone,
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
        diesel::update(DbUser::table())
            .set(self)
            .filter(users::email.eq(self.email.clone()))
            .get_result(conn)
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
            phone: user.phone,
            create_date: user.create_date,
            update_date: user.update_date,
        }
    }
}

impl From<ApiUser> for DbUser {
    fn from(user: ApiUser) -> Self {
        DbUser {
            email: user.email,
            name: user.name.unwrap(),
            passwd: user.passwd.unwrap(),
            phone: user.phone,
            create_date: chrono::Utc::now().naive_utc(),
            update_date: chrono::Utc::now().naive_utc(),
        }
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct ApiUser {
    email: String,
    name: Option<String>,
    passwd: Option<String>,
    phone: Option<i32>,
}

impl ApiUser {
    pub fn merge(self, other_user: DbUser) -> DbUser {
        DbUser {
            email: other_user.email,
            name: self.name.unwrap_or(other_user.name),
            passwd: self.passwd.unwrap_or(other_user.passwd),
            phone: self.phone.or(other_user.phone),
            create_date: other_user.create_date,
            update_date: chrono::Utc::now().naive_utc(),
        }
    }
}

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug)]
pub struct User {
    email: String,
    name: String,
    passwd: String,
    phone: Option<i32>,
    my_cars: Vec<SendCar>,
    shared_cars: Vec<SendCar>,
    ads: Vec<FullAd>,
    fav_ads: Vec<FullAd>,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
}

impl User {
    pub fn get(other_email: &str, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        Self::from_db(DbUser::table().find(other_email).first(conn)?, conn)
    }

    pub fn from_db(dbuser: DbUser, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        let my_cars = Car::belonging_to(&dbuser).load(conn)?;
        let my_cars = my_cars
            .iter()
            .filter_map(|car: &Car| SendCar::from_car(car.clone(), conn).ok())
            .collect();
        let shared_cars = CarShare::belonging_to(&dbuser)
            .load::<CarShare>(conn)?
            .iter()
            .filter_map(|x| x.to_car(conn).ok())
            .collect();
        let other_ads = Ad::belonging_to(&dbuser)
            .load::<Ad>(conn)?
            .iter()
            .filter_map(|x| Ad::get_full_info(x.id, conn).ok())
            .collect();
        let other_fav_ads = FavoriteAd::belonging_to(&dbuser)
            .load::<FavoriteAd>(conn)?
            .iter()
            .filter_map(|x| Ad::table().find(x.ad_id).first::<Ad>(conn).ok())
            .filter_map(|x| Ad::get_full_info(x.id, conn).ok())
            .collect();
        Ok(User {
            email: dbuser.email,
            name: dbuser.name,
            passwd: dbuser.passwd,
            phone: dbuser.phone,
            my_cars,
            shared_cars,
            ads: other_ads,
            fav_ads: other_fav_ads,
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
    pub passwd: String,
}
