-- Your SQL goes here

Alter table models drop column body_type;
Alter table cars add column body_type BodytypeEnum not null;
