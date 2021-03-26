-- Your SQL goes here
create table favorite_ads (
    ad_id uuid not null references ads,
    user_id varchar not null references users,
    primary key (ad_id, user_id)
)
