table! {
    use diesel::sql_types::*;
    use crate::car::{Gearboxenum, model::*, maintenance::Typeenum};

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
    use crate::car::{Gearboxenum, model::*, maintenance::Typeenum};

    car_shares (car, share_user) {
        car -> Varchar,
        share_user -> Varchar,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearboxenum, model::*, maintenance::Typeenum};

    cars (vin) {
        vin -> Varchar,
        name -> Nullable<Varchar>,
        number_plate -> Nullable<Varchar>,
        kms -> Int4,
        model -> Uuid,
        gearbox -> Gearboxenum,
        car_date -> Date,
        add_date -> Timestamp,
        owner -> Varchar,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearboxenum, model::*, maintenance::Typeenum};

    favorite_ads (ad_id, user_id) {
        ad_id -> Uuid,
        user_id -> Varchar,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearboxenum, model::*, maintenance::Typeenum};

    maintenance (id) {
        id -> Uuid,
        kms -> Int4,
        price -> Int4,
        #[sql_name = "type"]
        type_ -> Typeenum,
        description -> Nullable<Text>,
        car -> Varchar,
        owner -> Varchar,
        date -> Date,
        created_date -> Timestamp,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearboxenum, model::*, maintenance::Typeenum};

    models (id) {
        id -> Uuid,
        make -> Varchar,
        model -> Varchar,
        power -> Nullable<Int4>,
        engine_size -> Nullable<Int4>,
        fuel -> Fuelenum,
        body_type -> Bodytypeenum,
    }
}

table! {
    use diesel::sql_types::*;
    use crate::car::{Gearboxenum, model::*, maintenance::Typeenum};

    users (email) {
        email -> Varchar,
        name -> Varchar,
        passwd -> Varchar,
        create_date -> Timestamp,
        update_date -> Timestamp,
        phone -> Nullable<Int4>,
    }
}

joinable!(ads -> cars (car));
joinable!(ads -> users (owner));
joinable!(car_shares -> cars (car));
joinable!(car_shares -> users (share_user));
joinable!(cars -> models (model));
joinable!(cars -> users (owner));
joinable!(favorite_ads -> ads (ad_id));
joinable!(favorite_ads -> users (user_id));
joinable!(maintenance -> cars (car));
joinable!(maintenance -> users (owner));

allow_tables_to_appear_in_same_query!(
    ads,
    car_shares,
    cars,
    favorite_ads,
    maintenance,
    models,
    users,
);
