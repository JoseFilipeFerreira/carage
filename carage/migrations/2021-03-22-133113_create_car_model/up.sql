-- Your SQL goes here
CREATE TYPE fuel AS ENUM ('Diesel', 'Petrol', 'Eletric', 'HybridDiesel', 'HybridPetrol', 'Gas', 'Hydrogen');
CREATE TYPE Bodytype AS ENUM ('Sedan', 'Wagon', 'Convertible', 'Coupe', 'Hatchback', 'SUV', 'Minivan');

create table models (
    id varchar primary key,
    make varchar not null,
    model varchar not null,
    power integer,
    engine_size integer,
    fuel fuel not null,
    body_type Bodytype not null
)
