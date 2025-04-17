/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import UpdateCard from "../components/UpdateCard";
import PostModal from "../components/PostModal";
import { db, storage } from "../context/AuthContext";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles/UpdatePage.css";
import { reload } from "firebase/auth";

const UpdatePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
   
  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const postsList = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (postsList.length === 0) {
        // Default posts if no posts are available
        setPosts([
          {
            id: 1,
            user: "Roomloo Admin",
            content: "Welcome to Roomloo! Find PGs and Roommates easily. Stay updated with our latest features!",
            image: "/assets/bg2.jpg",
            likes: 0,
            comments: 0,
            shares: 0,
          },
          {
            id: 2,
            user: "Roomloo Admin",
            content: "We have improved our search functionality for PGs. Try it out!",
            image: "/assets/bg1.jpg",
            likes: 0,
            comments: 0,
            shares: 0,
          },
        ]);
      } else {
        setPosts(postsList);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchFocus = () => {
    setFilterActive(true);
  };

  const handleSearchBlur = () => {
    if (searchTerm === "") {
      setFilterActive(false);
    }
  };

  return (
    <div className="update-container">
      {/* Header */}
      <div className="update-header">
        <h1>Room<span>loo</span> Updates</h1>
        <p>Stay connected with the latest news and updates</p>
      </div>

      {/* Search Bar */}
      <div className={`search-container ${filterActive ? 'active' : ''}`}>
        <input
          type="text"
          placeholder="Search updates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="search-input-top"
        />
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* Updates List */}
      <div className="updates-list">
        {posts
          .filter(update => update.content.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
      </div>

      {/* Floating Action Button */}
      <button 
        className="create-post-button" 
        onClick={() => setIsModalOpen(true)}
        aria-label="Create new post"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      {/* Post Modal */}
      {isModalOpen && (
        <PostModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UpdatePage;