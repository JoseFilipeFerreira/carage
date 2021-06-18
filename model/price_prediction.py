import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split

from scipy.stats.mstats import winsorize

from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import Normalizer
from sklearn.decomposition import PCA
from sklearn.model_selection import GridSearchCV

from sklearn import metrics

from sklearn.linear_model import LinearRegression
import statsmodels.api as sm
from sklearn.linear_model import Lasso
from sklearn.linear_model import Ridge
from sklearn.svm import SVR
from xgboost import XGBRegressor
from lightgbm import LGBMRegressor

import warnings
warnings.filterwarnings('ignore')

# Data Preparation
def prepare_data(dataset):
    # Read csv
    df = pd.read_csv(dataset)
    
    # Drop unnecessary columns
    df.drop(['model'],axis=1,inplace=True)
    df.drop(['version'],axis=1,inplace=True)
    df.drop(['seats'],axis=1,inplace=True)
    df.drop(['doors'],axis=1,inplace=True)
    df.drop(['month'],axis=1,inplace=True)
    df.drop(['origin'],axis=1,inplace=True)

    # Replace accented values
    df = df.replace(['Automática','Semi-automática'], 'Automatic')
    df = df.replace(['Gasolina'], 'Petrol')
    df = df.replace(['Eléctrico'], 'Eletric')
    df = df.replace(['Híbrido(Gasolina)'], 'HybridPetrol')
    df = df.replace(['Híbrido(Diesel)'], 'HybridDiesel')
    
    df_cars = df

    # Dummy values
    df_dummy = pd.get_dummies(df_cars['brand'])
    df_cars = pd.concat([df_cars, df_dummy], axis = 1)
    df_cars.drop('brand', axis = 1, inplace=True)

    df_dummy = pd.get_dummies(df_cars['fuel'])
    df_cars = pd.concat([df_cars, df_dummy], axis = 1)
    df_cars.drop('fuel', axis = 1, inplace=True)

    df_dummy = pd.get_dummies(df_cars['gearbox'])
    df_cars = pd.concat([df_cars, df_dummy], axis = 1)
    df_cars.drop('gearbox', axis = 1, inplace=True)

    # Drop empty values
    df_cars.dropna(axis=0,inplace=True)

    return df_cars


def preprocess_data(df_cars):
    y = df_cars['price']
    X = df_cars.drop(['price'], axis = 1)

    # # X_train_org, X_test_org, y_train, y_test = train_test_split(X, y, random_state = 0)
    # X_train_org, X_test_org, y_train, y_test = train_test_split(X, y,test_size = 0.1, random_state = 25)

    # scaler = MinMaxScaler()
    # X_train = scaler.fit_transform(X_train_org)
    # #.fit_transform first fits the original data and then transforms it
    # X_test = scaler.transform(X_test_org)

    return X, y

def fit_predict_score(Model, X_train, y_train, X_test, y_test):
    model = Model
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    test_predict = model.predict(X_test)
    test_predict = pd.DataFrame(test_predict,columns=['Predicted_Price'])
    test_predict['Predicted_Price'] = round(test_predict['Predicted_Price'],2)
    y_test_index = y_test.reset_index()
    y_test_index = y_test_index.drop(columns='index', axis = 1)
    test_predict = pd.concat([y_test_index, test_predict], axis = 1)

    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)

    return (train_score, test_score, metrics.mean_absolute_error(y_test, y_pred),
            metrics.mean_squared_error(y_test, y_pred), np.sqrt(metrics.mean_squared_error(y_test, y_pred)), test_predict, model)


def predict_score(model, data, X_test):
    car_test = pd.DataFrame(columns = ['brand', 'fuel', 'year', 'km', 'displacement', 'power', 'gearbox'])
    new_row = {'brand': data['brand'], 'fuel': data['fuel'], 'year': float(data['year']), 'km': float(data['km']), 'displacement': float(data['displacement']), 'power': float(data['power']), 'gearbox': data['gearbox']}
    car_test = car_test.append(new_row, ignore_index=True)

    df_dummy = pd.get_dummies(car_test['fuel'])
    car_test = pd.concat([car_test, df_dummy], axis = 1)
    car_test.drop('fuel', axis = 1, inplace=True)

    df_dummy = pd.get_dummies(car_test['gearbox'])
    car_test = pd.concat([car_test, df_dummy], axis = 1)
    car_test.drop('gearbox', axis = 1, inplace=True)

    df_dummy = pd.get_dummies(car_test['brand'])
    car_test = pd.concat([car_test, df_dummy], axis = 1)
    car_test.drop('brand', axis = 1, inplace=True)

    car_test = car_test.reindex(columns=X_test.columns, fill_value=0)

    return model.predict(car_test)

def model_comparison(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
    
    # lrm_train_score, lrm_test_score, lrm_mae, lrm_mse, lrm_rmse, lrm_predict, lrm_model = fit_predict_score(LinearRegression(), X_train, y_train, X_test, y_test)
    # lasso_train_score, lasso_test_score, lasso_mae, lasso_mse, lasso_rmse, lasso_predict, lasso_model = fit_predict_score(Lasso(), X_train, y_train, X_test, y_test)
    # ridge_train_score, ridge_test_score, ridge_mae, ridge_mse, ridge_rmse, ridge_predict, ridge_model = fit_predict_score(Ridge(), X_train, y_train, X_test, y_test)
    # svr_train_score, svr_test_score, svr_mae, svr_mse, svr_rmse = fit_predict_score(SVR(kernel='linear'), X_train, y_train, X_test, y_test)
    xgbr_train_score, xgbr_test_score, xgbr_mae, xgbr_mse, xgbr_rmse, xgbr_predict, xgbr_model = fit_predict_score(XGBRegressor(), X_train, y_train, X_test, y_test)
    # lgbr_train_score, lgbr_test_score, lgbr_mae, lgbr_mse, lgbr_rmse = fit_predict_score(LGBMRegressor(), X_train, y_train, X_test, y_test)
    
    models = ['XGBoost (Regressor)']
    train_score = [xgbr_train_score]
    test_score = [xgbr_test_score]
    mae = [xgbr_mae]
    mse = [xgbr_mse]
    rmse = [xgbr_rmse]
    
    model_comparison = pd.DataFrame(data=[models, train_score, test_score, mae, mse, rmse]).T.rename({0: 'Model', 1:'Training Score',
                                                                                    2: 'Test Score',
                                                                                    3:'Mean Absolute Error',
                                                                                    4: 'Mean Squared Error',
                                                                                    5:'Root Mean Squared Error'}, axis=1)
    
    return model_comparison, xgbr_predict, xgbr_model, rmse
