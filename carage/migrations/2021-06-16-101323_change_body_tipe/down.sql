-- This file should undo anything in `up.sql`
Alter table cars drop column body_type;
Drop type Bodytype;
Alter table models add column body_type BodytypeEnum not null;
