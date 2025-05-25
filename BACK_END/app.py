from flask import Flask
from flask_cors import CORS
from api.routes import api_bp


def create_app():
    app = Flask(__name__)
    CORS(app)
    # Blueprintを登録
    app.register_blueprint(api_bp)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=4000, debug=True)