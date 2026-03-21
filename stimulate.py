import requests
import random
import time

URL = "http://localhost:3001/sensor-data"  # backend later

def generate_data():
    return {
        "co2_ppm": random.randint(380, 450),
        "energy": round(random.uniform(1.0, 2.0), 2)
    }

while True:
    data = generate_data()
    print("Sending:", data)

    try:
        r = requests.post(URL, json=data)
        print("Response:", r.status_code)
    except:
        print("Backend not running")

    time.sleep(5)
