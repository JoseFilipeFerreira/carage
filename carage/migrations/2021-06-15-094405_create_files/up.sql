-- Your SQL goes here
create table files (
    id uuid not null,
    filename varchar not null,
    car_id varchar not null references cars,
    primary key(id, car_id)
)
