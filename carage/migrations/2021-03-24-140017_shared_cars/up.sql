-- Your SQL goes here
create table car_shares (
    car varchar not null references cars,
    share_user varchar not null references users,
    primary key (car, share_user)
)
