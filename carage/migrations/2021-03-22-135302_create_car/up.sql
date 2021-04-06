-- Your SQL goes here
CREATE TYPE gearboxEnum AS ENUM ('automatic', 'manual');
create table cars (
    vin varchar primary key,
    name varchar,
    number_plate varchar unique,
    kms integer not null,
    model uuid not null references models,
    gearbox gearboxEnum not null,
    car_date date not null,
    add_date timestamp not null,
    owner varchar not null references users
)
