use crate::schema::models;
use diesel::{AsExpression, Identifiable, Insertable, Queryable};
use diesel_derive_enum::DbEnum;
use uuid::Uuid;

#[derive(AsExpression, Queryable, Insertable, Identifiable, PartialEq, Debug, Eq)]
#[table_name = "models"]
pub struct Model {
    id: Uuid,
    make: String,
    model: String,
    power: i32,
    engine_size: i32,
    fuel: Fuel,
    body_type: Bodytype,
}

#[derive(Clone, Copy, DbEnum, Debug, PartialEq, Eq, SqlType, AsExpression)]
#[sql_type = "Fuel"]
#[postgres(type_name = "fuel")]
pub enum Fuel {
    Diesel,
    Petrol,
    Eletric,
    HybridPetrol,
    HybridDiesel,
    Gas,
    Hydrogen,
}

#[derive(Clone, Copy, DbEnum, Debug, PartialEq, Eq, SqlType, AsExpression)]
#[postgres(type_name = "BodyType")]
#[sql_type = "Bodytype"]
pub enum Bodytype {
    Sedan,
    Wagon,
    Convertible,
    Coupe,
    Hatchback,
    SUV,
    Minivan,
}
