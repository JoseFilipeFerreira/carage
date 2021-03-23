-- Your SQL goes here
create table ads (
    id uuid primary key,
    car varchar references cars,
    owner varchar references users,
    price real not null,
    promo_price real,
    create_date timestamp not null,
    update_date timestamp not null
)

