import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import styles from './ChatInterface.module.css';

const ChatInterface = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef(null);

    useEffect(() => {
        const socketInstance = io('http://localhost:3000');
        setSocket(socketInstance);

        socketInstance.on('response', (data) => {
            // Check if the response text is NOT the specific string to ignore
            if (data.response !== '[No response]') {
                const aiResponse = { sender: 'ai', text: data.response };
                setMessages(prevMessages => [...prevMessages, aiResponse]);
            }
            // Always stop loading, regardless of whether the message was added
            setIsLoading(false);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (messageListRef.current) {
            const { scrollHeight } = messageListRef.current;
            messageListRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputText.trim() === '' || !socket) return;

        const newUserMessage = { sender: 'user', text: inputText };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setIsLoading(true);
        socket.emit('message', { prompt: inputText });
        
        setInputText('');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.chatContainer}>
                <h1 className={`${styles.chatbot_heading} ${styles.gradientText}`}>
                    Hi I'm Chandni, specially made for you
                </h1>
                <div className={styles.messageList} ref={messageListRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.messageItem} ${msg.sender === 'user' ? styles.user : styles.ai}`}
                        >
                            <div className={styles.senderName}>
                                {msg.sender === 'user' ? 'You' : 'Chandni'}
                            </div>
                            <div className={styles.messageBubble}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className={`${styles.messageItem} ${styles.ai}`}>
                            <div className={styles.senderName}>AI</div>
                            <div className={styles.messageBubble}>
                                <div className={styles.loadingDots}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className={styles.inputFormWrapper}></div>
                    <form onSubmit={handleSendMessage} className={styles.inputForm}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            className={styles.inputField}
                        />
                        <button type="submit" className={styles.sendButton} disabled={isLoading}>
                            ➤
                        </button>
                    </form>
                </div>
            </div>
        
    );
};

export default ChatInterface;