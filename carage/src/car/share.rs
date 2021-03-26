use crate::schema::car_shares;
use diesel::{AsExpression, Identifiable, Insertable, Queryable};

#[derive(Insertable, Queryable, Identifiable, AsExpression, PartialEq, Debug, Eq)]
#[table_name = "car_shares"]
#[primary_key(car, share_user)]
pub struct CarShare {
    car: String,
    share_user: String,
}
