from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/score', methods=['POST'])
def score():
    data = request.json

    claimed = data.get('claimed_tonnes', 0)
    co2 = data.get('avg_co2_ppm', 400)

    score = 100

    if claimed > 1000:
        score -= 20
    if co2 > 800:
        score -= 25

    score = max(0, min(100, score + random.randint(-5, 5)))

    return jsonify({
        "confidence_score": score,
        "message": "AI verified"
    })

app.run(port=5001)
