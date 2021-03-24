table! {
    use diesel::sql_types::*;
    use crate::car::{Gearbox, model::*};

    ads (id) {
        id -> Uuid,
        car -> Varchar,
        owner -> Varchar,
        price -> Int4,
        promo_price -> Nullable<Int4>,
        create_date -> Timestamp,
        update_date -> Timestamp,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearbox, model::*};

    car_shares (car, share_user) {
        car -> Varchar,
        share_user -> Varchar,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearbox, model::*};

    cars (vin) {
        vin -> Varchar,
        name -> Nullable<Varchar>,
        number_plate -> Nullable<Varchar>,
        kms -> Int4,
        model -> Uuid,
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
        id -> Uuid,
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

joinable!(ads -> cars (car));
joinable!(ads -> users (owner));
joinable!(car_shares -> cars (car));
joinable!(car_shares -> users (share_user));
joinable!(cars -> models (model));
joinable!(cars -> users (owner));

allow_tables_to_appear_in_same_query!(
    ads,
    car_shares,
    cars,
    models,
    users,
);
