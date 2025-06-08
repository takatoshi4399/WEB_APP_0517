import React, { useState } from 'react';
import { Stack, TextField, PrimaryButton, Box } from '@fluentui/react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <Box
      styles={{
        root: {
          width: 400,
          height: 500,
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 16,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        styles={{
          root: {
            flexGrow: 1,
            overflowY: 'auto',
            marginBottom: 16,
          },
        }}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            styles={{
              root: {
                marginBottom: 8,
                padding: 8,
                background: '#f3f2f1',
                borderRadius: 4,
                alignSelf: 'flex-start',
                maxWidth: '80%',
              },
            }}
          >
            {msg}
          </Box>
        ))}
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <TextField
          value={input}
          onChange={(_, newValue) => setInput(newValue)}
          placeholder="メッセージを入力"
          styles={{ root: { flexGrow: 1 } }}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <PrimaryButton text="送信" onClick={handleSend} />
      </Stack>
    </Box>
  );
};

export default ChatBox;