from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
import joblib
import requests

app = FastAPI()

class scoring_item(BaseModel):
    arah_angin: str
    hujan: float
    humidity : int
    kecepatan_angin: float
    tekanan_udara: float
    temperature: float
    tingkat_cahaya: int
    tingkat_gerimis: int

with open("xgboost_weatherstation.pkl", "rb") as f:
    model = pickle.load(f)

label = joblib.load("labelencoder.joblib")

@app.post("/predict1")
async def scoring_endpoint(item:scoring_item):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())

    arah_angin_encoded = label.transform([item.arah_angin])[0] if item.arah_angin in label.classes_ else -1
    df['arah_angin'] = arah_angin_encoded

    yhat = model.predict(df)
    return {"hasil": int(yhat)}

@app.post("/predict2")
async def scoring_endpoint2(item:scoring_item):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())

    arah_angin_encoded = label.transform([item.arah_angin])[0] if item.arah_angin in label.classes_ else -1
    df['arah_angin'] = arah_angin_encoded

    yhat = model.predict(df)
    return {"hasil": int(yhat)}

@app.post("/predict3")
async def scoring_endpoint3(item:scoring_item):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())

    arah_angin_encoded = label.transform([item.arah_angin])[0] if item.arah_angin in label.classes_ else -1
    df['arah_angin'] = arah_angin_encoded

    yhat = model.predict(df)
    return {"hasil": int(yhat)}

@app.post('/forecast1')
async def forecast_1_day_endpoint(item: scoring_item):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())

    arah_angin_encoded = label.transform([item.arah_angin])[0] if item.arah_angin in label.classes_ else -1
    df['arah_angin'] = arah_angin_encoded

    yhat = model.predict(df)
    return {"hasil": int(yhat)}

@app.post('/forecast2')
async def forecast_2_days_endpoint(item: scoring_item):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())

    arah_angin_encoded = label.transform([item.arah_angin])[0] if item.arah_angin in label.classes_ else -1
    df['arah_angin'] = arah_angin_encoded

    yhat = model.predict(df)
    return {"hasil": int(yhat)}