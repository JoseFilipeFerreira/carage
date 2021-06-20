pub mod api;
pub mod fav_ad;
use crate::{
    car::{model::Model, Car},
    fairings::Page,
    schema::ads,
    user::DbUser,
};
use chrono::NaiveDateTime;
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Associations, Identifiable, Insertable,
    QueryDsl, Queryable, RunQueryDsl,
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
    Clone,
    QueryId,
    AsChangeset,
)]
#[belongs_to(DbUser, foreign_key = "owner")]
#[belongs_to(Car, foreign_key = "car")]
#[table_name = "ads"]
pub struct Ad {
    pub id: Uuid,
    car: String,
    owner: String,
    price: i32,
    promo_price: Option<i32>,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
}

impl Ad {
    pub fn from_api(ad: ApiAd, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(Self::table())
            .values(Self::from(ad))
            .get_result(conn)
    }

    pub fn update(&self, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::update(Self::table()).set(self).get_result(conn)
    }

    pub fn delete(id: Uuid, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        diesel::delete(Self::table().find(id)).get_result(conn)
    }

    pub fn get(id: Uuid, conn: &PgConnection) -> Result<Self, diesel::result::Error> {
        Self::table().find(id).first(conn)
    }
    pub fn get_full_info(id: Uuid, conn: &PgConnection) -> Result<FullAd, diesel::result::Error> {
        Ad::table()
            .find(id)
            .inner_join(DbUser::table())
            .inner_join(Car::table().inner_join(Model::table()))
            .select((
                crate::schema::ads::all_columns,
                crate::schema::cars::all_columns,
                crate::schema::users::all_columns,
            ))
            .first::<(Ad, Car, DbUser)>(conn)
            .map(|x| {
                let car = crate::car::SendCar::from_car(x.1.clone(), conn).unwrap();
                let mut z = FullAd::new(&(x.0, x.1, car.model, x.2, car.imgs));
                z.user.passwd = "[REDACTED]".to_owned();
                z
            })
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct ApiAd {
    id: Option<Uuid>,
    car: String,
    owner: String,
    price: Option<i32>,
    promo_price: Option<i32>,
}

impl From<ApiAd> for Ad {
    fn from(other: ApiAd) -> Self {
        Self {
            id: Uuid::new_v4(),
            car: other.car,
            owner: other.owner,
            price: other.price.unwrap(),
            promo_price: other.promo_price,
            create_date: chrono::Utc::now().naive_utc(),
            update_date: chrono::Utc::now().naive_utc(),
        }
    }
}

impl From<Ad> for ApiAd {
    fn from(other: Ad) -> Self {
        Self {
            id: Some(other.id),
            car: other.car,
            owner: other.owner,
            price: Some(other.price),
            promo_price: other.promo_price,
        }
    }
}

impl ApiAd {
    pub fn merge(&self, other: Ad) -> Ad {
        Ad {
            id: self.id.unwrap(),
            car: other.car,
            owner: other.owner,
            price: self.price.unwrap_or(other.price),
            promo_price: self.promo_price,
            create_date: other.create_date,
            update_date: chrono::Utc::now().naive_utc(),
        }
    }
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct AdSearch {
    pub page: Page,
    pub make: Option<String>,
    pub model: Option<String>,
    pub fuel: Option<crate::car::model::Fuel>,
    pub body_type: Option<crate::car::model::Bodytype>,
    pub gearbox: Option<crate::car::Gearbox>,
    pub max_price: Option<i32>,
    pub min_price: Option<i32>,
    pub max_date: Option<chrono::NaiveDate>,
    pub min_date: Option<chrono::NaiveDate>,
    pub max_kms: Option<i32>,
    pub min_kms: Option<i32>,
}

#[derive(Serialize, Clone, Deserialize, Eq, PartialEq, Debug)]
pub struct FullAd {
    pub ad: Ad,
    pub car: Car,
    pub model: Model,
    pub user: DbUser,
    pub imgs: Vec<crate::img::File>,
}

impl FullAd {
    pub fn new(
        (ad, car, model, user, imgs): &(Ad, Car, Model, DbUser, Vec<crate::img::File>),
    ) -> Self {
        Self {
            ad: ad.clone(),
            car: car.clone(),
            model: model.clone(),
            user: user.clone(),
            imgs: imgs.clone(),
        }
    }
}
