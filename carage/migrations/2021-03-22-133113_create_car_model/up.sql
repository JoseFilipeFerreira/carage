-- Your SQL goes here
CREATE TYPE fuel AS ENUM ('diesel', 'petrol', 'eletric', 'hybrid_diesel', 'hybrid_petrol', 'gas', 'hydrogen');
CREATE TYPE Bodytype AS ENUM ('sedan', 'wagon', 'convertible', 'coupe', 'hatchback', 'sUV', 'minivan');

create table models (
    id uuid primary key,
    make varchar not null,
    model varchar not null,
    power integer,
    engine_size integer,
    fuel fuel not null,
    body_type Bodytype not null
)
