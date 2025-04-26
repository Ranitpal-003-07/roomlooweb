/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/chatCard.css';

const ChatCard = ({ chat, currentUser, onSelectChat, selectedChatId }) => {
  const [otherUserInfo, setOtherUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  const isSelected = selectedChatId === chat.id;

  // 💡 Early return if currentUser is null
  if (!currentUser) return null;

  useEffect(() => {
    const fetchOtherUserInfo = async () => {
      try {
        const otherUserId = chat.participants.find(uid => uid !== currentUser?.uid);
        if (otherUserId) {
          const userDoc = await getDoc(doc(db, 'users', otherUserId));
          setOtherUserInfo(userDoc.exists() ? userDoc.data() : { displayName: 'Unknown User' });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setOtherUserInfo({ displayName: 'Error loading user' });
        setLoading(false);
      }
    };

    fetchOtherUserInfo();
  }, [chat, currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const messageObj = {
        text: newMessage,
        sender: currentUser.uid,
        timestamp: new Date(),
      };

      const arrayField = currentUser.uid === chat.user1 ? 'chatUser1' : 'chatUser2';

      await updateDoc(doc(db, 'chats', chat.id), {
        [arrayField]: arrayUnion(messageObj),
        lastUpdated: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getAllMessages = () => {
    const user1Messages = (chat.chatUser1 || []).map(msg => ({ ...msg, arrayField: 'chatUser1' }));
    const user2Messages = (chat.chatUser2 || []).map(msg => ({ ...msg, arrayField: 'chatUser2' }));

    return [...user1Messages, ...user2Messages].sort((a, b) => {
      const timeA = a.timestamp?.toDate?.() || new Date(a.timestamp);
      const timeB = b.timestamp?.toDate?.() || new Date(b.timestamp);
      return timeA - timeB;
    });
  };

  const getLastMessage = () => {
    const allMessages = getAllMessages();
    return allMessages.length > 0 ? allMessages[allMessages.length - 1] : null;
  };

  const lastMessage = getLastMessage();

  // 📦 Collapsed view
  if (!isSelected) {
    return (
      <div className="chat-card" onClick={() => onSelectChat && onSelectChat(chat.id)}>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="chat-avatar">
              {otherUserInfo?.profileImageUrl ? (
                <img src={otherUserInfo.profileImageUrl} alt="Profile" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  {otherUserInfo?.fullName?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <div className="chat-info">
              <div className="chat-name">{otherUserInfo?.fullName || 'Unknown User'}</div>
              <div className="chat-preview">
                {lastMessage && (
                  <p className="last-message">
                    {lastMessage.sender === currentUser.uid ? 'You: ' : ''}
                    {lastMessage.text?.length > 25
                      ? `${lastMessage.text.substring(0, 25)}...`
                      : lastMessage.text}
                  </p>
                )}
              </div>
              <div className="chat-time">
                {chat.lastUpdated && (
                  <span className="time-stamp">
                    {new Date(chat.lastUpdated.toDate()).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // 📥 Expanded view
  const messages = getAllMessages();

  return (
    <div className="chat-expanded">
      <div className="chat-header">
        <div className="chat-avatar">
          {otherUserInfo?.profileImageUrl ? (
            <img src={otherUserInfo.profileImageUrl} alt="Profile" className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">
              {otherUserInfo?.fullName?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <div className="chat-name">
          {otherUserInfo?.fullName || 'Unknown User'}
        </div>
        <button className="back-button" onClick={() => onSelectChat(null)}>Back</button>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === currentUser.uid ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">{message.text}</div>
              <div className="message-time">
                {message.timestamp
                  ? new Date(
                      message.timestamp.toDate?.() || message.timestamp
                    ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'Sending...'}
              </div>
            </div>
          ))
        )}
      </div>

      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default ChatCard;
