-- Your SQL goes here
create table users (
    email varchar primary key,
    name varchar not null,
    passwd varchar not null,
    create_date timestamp not null,
    update_date timestamp not null
)
