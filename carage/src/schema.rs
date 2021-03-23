table! {
    use diesel::sql_types::*;
    use crate::car::{Gearbox, model::*};

    cars (vin) {
        vin -> Varchar,
        name -> Nullable<Varchar>,
        number_plate -> Nullable<Varchar>,
        kms -> Int4,
        model -> Nullable<Varchar>,
        gearbox -> Gearbox,
        car_date -> Date,
        add_date -> Timestamp,
        owner -> Varchar,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearbox, model::*};

    models (id) {
        id -> Varchar,
        make -> Varchar,
        model -> Varchar,
        power -> Nullable<Int4>,
        engine_size -> Nullable<Int4>,
        fuel -> Fuel,
        body_type -> Bodytype,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearbox, model::*};

    users (email) {
        email -> Varchar,
        passwd -> Varchar,
        create_date -> Timestamp,
        update_date -> Timestamp,
    }
}

joinable!(cars -> models (model));
joinable!(cars -> users (owner));

allow_tables_to_appear_in_same_query!(
    cars,
    models,
    users,
);
