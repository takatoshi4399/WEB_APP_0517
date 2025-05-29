from flask import Blueprint, jsonify


api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/message', methods=['GET'])
def message():
    return jsonify({
        "message": "こんにちは、Blueprint経由のエンドポイントです！"
    })

@api_bp.route('/locations', methods=['GET'])
def locations():
    data = [
        {"name": "Tokyo",    "lat": 35.6895,  "lon": 139.6917},
        {"name": "New York", "lat": 40.7128,  "lon": -74.0060},
        {"name": "London",   "lat": 51.5074,  "lon": -0.1278},
        {"name": "Sydney",   "lat": -33.8688, "lon": 151.2093}
    ]
    return jsonify({"locations": data})
