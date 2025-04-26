/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import ChatCard from '../components/ChatCard.jsx';
import '../styles/chat.css';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { user:currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatRef = useRef(null);
  const [selectedChatId, setSelectedChatId] = useState(null);


  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  // Fetch all chats where currentUser is a participant
  useEffect(() => {
    if (!currentUser) return;
    
    setLoading(true);
    
    // Create a query to find all chats where the user is a participant
    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', currentUser.uid)
    );
    
    // Set up a real-time listener for changes in the chat list
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Add chat data to our array
        chatData.push({
          id: doc.id,
          ...data,
          // Find the other participant(s) in the chat
          otherParticipants: data.participants.filter(id => id !== currentUser.uid)
        });
      });
      
      setChatList(chatData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching chats:", error);
      setLoading(false);
    });
    
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [currentUser]);
  
  // Close chat when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`} ref={chatRef}>
      <div className="chat-body">
        <div className="chat-sidebar">
          <h2>Your Chats</h2>
          {loading ? (
            <p>Loading chats...</p>
          ) : chatList.length === 0 ? (
            <p>No chats found</p>
          ) : (
            chatList.map(chat => (
              <ChatCard
                key={chat.id}
                chat={chat}
                currentUser={currentUser}
                selectedChatId={selectedChatId}
                onSelectChat={handleSelectChat} // Pass the function here
              />
            ))
          )}
        </div>
      </div>
      
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faCommentDots} />
      </button>
    </div>
  );
};

export default Chat;