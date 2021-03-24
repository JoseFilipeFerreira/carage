use crate::schema::ads;
use chrono::NaiveDateTime;
use diesel::Queryable;
use uuid::Uuid;

#[derive(Insertable, Queryable, Identifiable, AsExpression, PartialEq, Debug)]
#[table_name = "ads"]
pub struct Ad {
    id: Uuid,
    car: String,
    owner: String,
    price: i32,
    promo_price: Option<i32>,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
}
