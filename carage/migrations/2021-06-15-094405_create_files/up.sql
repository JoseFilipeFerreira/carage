-- Your SQL goes here
create table files (
    id uuid not null primary key,
    filename varchar not null,
    car_id varchar not null references cars
)
