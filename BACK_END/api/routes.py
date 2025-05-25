from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/message', methods=['GET'])
def message():
    return jsonify({
        "message": "こんにちは、Blueprint経由のエンドポイントです！"
    })