from flask import Blueprint, jsonify, request
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/message', methods=['GET'])
def message():
    return jsonify({
        "message": "こんにちは、Blueprint経由のエンドポイントです！"
    })

@api_bp.route('/FortuneTellingGame', methods=['POST'])
def fortune_telling_game():
    # フロントエンドから送られてきたJSONデータを取得
    data = request.get_json()
    print(data)
    user_input = data.get('text', '')  # 例：{"text": "占いたい内容"} で送信される場合

    summary_template = """
        you are a fortune teller.
        given the information {information} about a person from i want you to create
        1. a fortune explanation in japanese with 100 words
    """
    summary_template = PromptTemplate(
        input_variables="infomation", template=summary_template
    )

    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

    chain = summary_template | llm

    res = chain.invoke(input={"information": user_input})
    
    # レスポンスから必要な部分のみを抽出
    if hasattr(res, 'content'):
        result_message = res.content
    else:
        result_message = str(res)

    # レスポンスを返す
    return jsonify({
        "message": result_message
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


