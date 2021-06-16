pub mod api;
use crate::schema::models;
use diesel::{
    associations::HasTable, pg::PgConnection, AsExpression, Identifiable, Insertable, QueryDsl,
    QueryResult, Queryable, RunQueryDsl,
};
use diesel_derive_enum::DbEnum;
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
)]
#[table_name = "models"]
pub struct Model {
    id: Uuid,
    make: String,
    model: String,
    power: i32,
    engine_size: i32,
    fuel: Fuel,
}

impl Model {
    pub fn get(model: &Uuid, conn: &PgConnection) -> QueryResult<Self> {
        Self::table().find(model).first(conn)
    }
}

#[derive(
    Clone, Copy, DbEnum, Debug, PartialEq, Eq, Serialize, Deserialize, SqlType, AsExpression,
)]
#[DieselType = "Fuelenum"]
#[postgres(type_name = "fuel")]
pub enum Fuel {
    Diesel,
    Petrol,
    Electric,
    HybridPetrol,
    HybridDiesel,
    Gpl,
    Hydrogen,
}

#[derive(
    Clone, Copy, DbEnum, Debug, PartialEq, Eq, SqlType, Serialize, Deserialize, AsExpression,
)]
#[postgres(type_name = "Bodytype")]
#[DieselType = "Bodytypeenum"]
pub enum Bodytype {
    Sedan,
    Wagon,
    Convertible,
    Coupe,
    Hatchback,
    Suv,
    Minivan,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct ModelDetails {
    pub make: String,
    pub model: String,
}
