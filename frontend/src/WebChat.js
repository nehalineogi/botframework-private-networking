import React, { useEffect } from 'react';

const WebChat = () => {
  useEffect(() => {
    const initializeWebChat = async () => {
      try {
        const res = await fetch('/getDirectLineToken', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: { id: 'my_test_id', name: 'my_test_name' },
            }),
          }
        );

        const { token } = await res.json();
        
        alert(`Token: ${token}Direct Line URL: ${process.env.REACT_APP_DIRECTLINE_URL}`);
        console.log(`Token: ${token}Direct Line URL: ${process.env.REACT_APP_DIRECTLINE_URL}`);

        window.WebChat.renderWebChat(
          {
            directLine: await window.WebChat.createDirectLineAppServiceExtension({
              domain: `${process.env.REACT_APP_DIRECTLINE_URL}/.bot/v3/directline`,
              token,
            }),
          },
          document.getElementById('webchat')
        );

        document.querySelector('#webchat > *').focus();
      } catch (err) {
        console.error('Error initializing WebChat:', err);
      }
    };

    initializeWebChat();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        id="webchat"
        role="main"
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
          height: '100%',
          margin: 'auto',
          maxWidth: '480px',
          minWidth: '360px',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '12px',
          color: '#888',
        }}
      >
        Version 1.0.0
      </div>
    </div>
  );
};

export default WebChat;