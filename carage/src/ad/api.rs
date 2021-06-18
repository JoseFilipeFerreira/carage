use super::{Ad, AdSearch, ApiAd, FullAd};
use crate::{
    car::{model::Model, Car},
    fairings::{Claims, Db, Page},
    user::DbUser,
};
use diesel::{associations::HasTable, ExpressionMethods, QueryDsl, RunQueryDsl};
use lazy_static::lazy_static;
use rocket::serde::json::Json;
use uuid::Uuid;

lazy_static! {
    pub static ref ROUTES: Vec<rocket::Route> = routes![get, create, remove, all, search, update];
}

#[post("/create", format = "json", data = "<ad>")]
pub async fn create(conn: Db, claims: Claims, mut ad: Json<ApiAd>) -> Option<Json<Ad>> {
    ad.owner = claims.email;
    match conn
        .run(move |c| {
            let car = Car::get(&ad.car, c)?;
            if car.owner == ad.owner {
                Ad::from_api(ad.clone(), c)
            } else {
                Err(diesel::result::Error::NotFound)
            }
        })
        .await
    {
        Ok(u) => Some(Json(u)),
        _ => None,
    }
}

#[post("/", data = "<ad>")]
pub async fn get(conn: Db, ad: String) -> Option<Json<FullAd>> {
    if let Ok(ad) = Uuid::parse_str(&ad) {
        match conn.run(move |c| Ad::get_full_info(ad, c)).await {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}

#[post("/all", data = "<page>")]
pub async fn all(conn: Db, page: Json<Page>) -> Option<Json<(i64, Vec<FullAd>)>> {
    match conn
        .run(move |c| {
            Ad::table()
                .inner_join(DbUser::table())
                .inner_join(Car::table().inner_join(Model::table()))
                .select((
                    crate::schema::ads::all_columns,
                    crate::schema::cars::all_columns,
                    crate::schema::models::all_columns,
                    crate::schema::users::all_columns,
                ))
                .offset(page.size * page.page)
                .limit(page.size)
                .get_results::<(Ad, Car, Model, DbUser)>(c)
        })
        .await
    {
        Ok(a) => Some(Json((
            conn.run(|c| Ad::table().count().get_result(c).unwrap())
                .await,
            a.iter()
                .map(|x| {
                    let mut z = FullAd::new(x);
                    z.user.passwd = "[REDACTED]".to_owned();
                    z
                })
                .collect(),
        ))),
        _ => None,
    }
}

#[delete("/remove/<ad>")]
pub async fn remove(conn: Db, claims: Claims, ad: String) -> Option<Json<Ad>> {
    if let Ok(ad) = Uuid::parse_str(&ad) {
        match conn
            .run(move |c| {
                let full_ad = Ad::get(ad, c)?;
                if full_ad.owner == claims.email {
                    Ad::delete(ad, c)
                } else {
                    Err(diesel::result::Error::NotFound)
                }
            })
            .await
        {
            Ok(u) => Some(Json(u)),
            _ => None,
        }
    } else {
        None
    }
}

#[post("/update", data = "<ad>")]
pub async fn update(conn: Db, claims: Claims, ad: Json<ApiAd>) -> Option<Json<ApiAd>> {
    if ad.id.is_some() {
        conn.run(move |c| {
            Ad::get(ad.id.unwrap(), c)
                .and_then(|db_ad| {
                    if db_ad.owner == claims.email {
                        let up_ad = ad.merge(db_ad);
                        up_ad.update(c)
                    } else {
                        Err(diesel::result::Error::NotFound)
                    }
                })
                .map(ApiAd::from)
        })
        .await
        .map(Json)
        .ok()
    } else {
        None
    }
}

#[post("/search", data = "<filters>")]
pub async fn search(conn: Db, filters: Json<AdSearch>) -> Option<Json<(i64, Vec<FullAd>)>> {
    match conn
        .run(move |c| {
            let mut query = Ad::table()
                .inner_join(DbUser::table())
                .inner_join(Car::table().inner_join(Model::table()))
                .into_boxed();
            if let Some(make) = &filters.make {
                query = query.filter(crate::schema::models::make.eq(make));
            };
            if let Some(model) = &filters.model {
                query = query.filter(crate::schema::models::model.eq(model));
            };
            if let Some(fuel) = filters.fuel {
                query = query.filter(crate::schema::models::fuel.eq(fuel));
            };
            if let Some(body_type) = filters.body_type {
                query = query.filter(crate::schema::cars::body_type.eq(body_type));
            };
            if let Some(gearbox) = filters.gearbox {
                query = query.filter(crate::schema::cars::gearbox.eq(gearbox));
            };
            if let Some(min_price) = filters.min_price {
                query = query.filter(crate::schema::ads::price.gt(min_price));
            };
            if let Some(max_price) = filters.max_price {
                query = query.filter(crate::schema::ads::price.lt(max_price));
            };
            if let Some(min_date) = filters.min_date {
                query = query.filter(crate::schema::cars::car_date.gt(min_date));
            };
            if let Some(max_date) = filters.max_date {
                query = query.filter(crate::schema::cars::car_date.lt(max_date));
            };
            if let Some(min_kms) = filters.min_kms {
                query = query.filter(crate::schema::cars::kms.gt(min_kms));
            };
            if let Some(max_kms) = filters.max_kms {
                query = query.filter(crate::schema::cars::kms.lt(max_kms));
            };
            query
                .select((
                    crate::schema::ads::all_columns,
                    crate::schema::cars::all_columns,
                    crate::schema::models::all_columns,
                    crate::schema::users::all_columns,
                ))
                .offset(filters.page.size * filters.page.page)
                .limit(filters.page.size)
                .get_results::<(Ad, Car, Model, DbUser)>(c)
        })
        .await
    {
        Ok(a) => Some(Json((
            conn.run(|c| Ad::table().count().get_result(c).unwrap())
                .await,
            a.iter()
                .map(|x| {
                    let mut z = FullAd::new(x);
                    z.user.passwd = "[REDACTED]".to_owned();
                    z
                })
                .collect(),
        ))),
        _ => None,
    }
}
