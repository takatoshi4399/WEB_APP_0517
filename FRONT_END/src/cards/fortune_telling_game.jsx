import React, { useState } from 'react';
import { PrimaryButton, TextField, MessageBar, MessageBarType } from '@fluentui/react';

// CSSで背景画像を設定
const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '800px'
};

const FortuneTellingGame = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('default message');

    // バックエンドへデータを送信する関数
    const sendDataToBackend = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/FortuneTellingGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: input }) // 送信データ
            });
            const data = await response.json();
            console.log(data);
            setMessage(data.message); // バックエンドからの返答を表示
        } catch (error) {
            setMessage('送信エラー');
        }
    };

    return (
        <div style={styles}>
            <div style={{ position: 'center', top: '200px', left: '100px', width: '200px'}}>
                <TextField
                    label="占いたいものを入力してください"
                    value={input}
                    onChange={(_, newValue) => setInput(newValue)}
                />
            </div>
            <div style={{ position: 'center', top: '200px', left: '600px', width: '200px' }}>
                <PrimaryButton text="送信" onClick={sendDataToBackend} />
                <MessageBar messageBarType={MessageBarType.info}>{message}</MessageBar>
            </div>
        </div>
    );
}

export default FortuneTellingGame;