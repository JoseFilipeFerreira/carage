-- Your SQL goes here
create table ads (
    id uuid primary key,
    car varchar not null references cars,
    owner varchar not null references users,
    price integer not null,
    promo_price integer,
    create_date timestamp not null, 
    update_date timestamp not null
)
