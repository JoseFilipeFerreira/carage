use diesel::Queryable;

#[derive(Queryable)]
pub struct Model {
    make: String,
    model: String,
    power: f32,
    engine_size: f32,
    fuel: Fuel,
    body_type: BodyType,
    gearbox: Gearbox,
}

pub enum Fuel {
    Diesel,
    Petrol,
    Eletric,
    HybridPetrol,
    HybridDiesel,
    Gas,
    Hydrogen,
}

pub enum BodyType {
    Sedan,
    Wagon,
    Convertible,
    Coupe,
    Hatchback,
    SUV,
    Minivan,
}

pub enum Gearbox {
    Manual,
    Automatic,
}
