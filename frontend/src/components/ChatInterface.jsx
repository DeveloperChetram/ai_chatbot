import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import styles from './ChatInterface.module.css'; // Import the CSS module

const ChatInterface = () => {
    // State to hold the array of messages (user and AI)
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([]);
    
    // State to hold the current value of the input field
    const [inputText, setInputText] = useState('');

    // A ref to the message list to enable auto-scrolling
    const messageListRef = useRef(null);

    // useEffect hook to scroll to the latest message whenever the messages array updates
    useEffect(() => {
        if (messageListRef.current) {
            const { scrollHeight, clientHeight } = messageListRef.current;
            messageListRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    /**
     * Handles the form submission when a user sends a message.
     * @param {React.FormEvent} e - The form event.
     */
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return;

        const newUserMessage = { sender: 'user', text: inputText };
        // Use a functional update to get the latest state
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        
        // --- Simulate AI Response ---
        setTimeout(() => {
            const aiResponse = { 
                sender: 'ai', 
                text: `This is a simulated AI response to: "${inputText}"` 
            };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
        }, 1000);
        
        setInputText('');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.chatContainer}>
            <h1 className={styles.chatbot_heading}>Hi, i'm specially made for you</h1>
                {/* The area where messages are displayed */}
                <div className={styles.messageList} ref={messageListRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.messageItem} ${msg.sender === 'user' ? styles.user : styles.ai}`}
                        >
                            <div className={styles.senderName}>
                                {msg.sender === 'user' ? 'You' : 'AI'}
                            </div>
                            <div className={styles.messageBubble}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* The form for user input */}
                <div className={styles.inputFormWrapper}>
                    <form onSubmit={handleSendMessage} className={styles.inputForm}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            className={styles.inputField}
                        />
                        <button type="submit" className={styles.sendButton}>
                            ➤
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;