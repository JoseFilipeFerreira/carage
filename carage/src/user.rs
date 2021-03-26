use crate::schema::users;
use chrono::NaiveDateTime;
use diesel::Queryable;

#[derive(Insertable, Queryable, Identifiable, AsExpression, PartialEq, Debug, Eq)]
#[table_name = "users"]
#[primary_key(email)]
pub struct User {
    email: String,
    passwd: String,
    //my_cars: Vec<Car>,
    //shared_cars: Vec<Car>,
    //ads: Vec<Ad>,
    create_date: NaiveDateTime,
    update_date: NaiveDateTime,
}
