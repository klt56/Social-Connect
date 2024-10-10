import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Importer useParams

const Chat = () => {
    const { communityId } = useParams(); // Récupérer le communityId depuis l'URL
    const userData = useSelector((state) => state.userReducer);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Récupérer les messages de la communauté lors du montage du composant
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/messages/${communityId}`, { withCredentials: true });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (communityId) {
            fetchMessages();
        }
    }, [communityId]);

    // Fonction pour envoyer un message
    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            const response = await axios.post(
                'http://localhost:5000/api/messages',
                {
                    sender: "67064e2ca30cd432d61a810c", // Utilisateur fictif pour l'exemple
                    community: communityId, // Utiliser le communityId récupéré depuis l'URL
                    content: input,
                },
                { withCredentials: true }
            );

            const newMessage = response.data.message;
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: { name: userData.name || 'You' },
                    content: newMessage.content,
                },
            ]);

            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender.name}</strong>: {msg.content}
                        </div>
                    ))
                ) : (
                    <p>Aucun message pour le moment.</p>
                )}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tapez votre message..."
                />
                <button onClick={sendMessage}>Envoyer</button>
            </div>
        </div>
    );
};

export default Chat;
