import requests

url = "http://127.0.0.1:5001/score"

data = {
    "claimed_tonnes": 500,
    "avg_co2_ppm": 420
}

response = requests.post(url, json=data)

print(response.json())
