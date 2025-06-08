import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './Styles/Card.css';
import './Styles/index.css';

// 描画対象のDOMを取得：❶DOMオブジェクトを取得する　②ルートコンテナ（ReactによるUIの出発点）を作成する
const root = ReactDOM.createRoot(document.getElementById('root'));

// 描画対象のDOMにAppコンポーネントを描画
root.render(<App />);

