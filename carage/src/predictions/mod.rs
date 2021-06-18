pub mod api;
use crate::car::{model::Model, Car};
use chrono::Datelike;
use inline_python::{python, Context};
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use tokio::sync::Mutex;

lazy_static! {
    static ref CTX: Mutex<Context> = Mutex::new(Context::new());
}

pub async fn tou() {
    CTX.lock().await.run(python! {
        import sys
        sys.path.append("../model")
        from price_prediction import *

        dataset = "../scrapper/StandVirtualCars.csv"

        df_cars = prepare_data(dataset)
        X, y = preprocess_data(df_cars)

        model_comparison, xgbr_predict, xgbr_model, rmse = model_comparison(X, y)
        xgbr_model.save_model("../model/tou.model")
        err = rmse[0]
    });
}

#[derive(Serialize, Clone, Deserialize, Debug)]
pub struct Prediction {
    pub price: f64,
    pub error: f64,
}

impl Prediction {
    pub async fn predict(car: Car, model: Model) -> Self {
        let ctx = CTX.lock().await;
        let model_make = model.make;
        let model_fuel = format!("{:?}", model.fuel);
        let car_year = car.car_date.year();
        let car_kms = car.kms;
        let model_engine_size = model.engine_size;
        let model_power = model.power;
        let car_gearbox = format!("{:?}", car.gearbox);
        ctx.run(python! {
        import sys
        sys.path.append("../model")
        from price_prediction import *

        car = {"brand": 'model_make, "fuel": 'model_fuel, "year": 'car_year, "km": 'car_kms, "displacement": 'model_engine_size, "power": 'model_power, "gearbox": 'car_gearbox}

        xgbr_model = XGBRegressor()
        xgbr_model.load_model("../model/tou.model")

        price = predict_score(xgbr_model, car, X)[0]
    });

        Self {
            price: ctx.get::<f64>("price"),
            error: ctx.get::<f64>("err"),
        }
    }
}
