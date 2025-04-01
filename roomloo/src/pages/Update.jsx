/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import UpdateCard from "../components/UpdateCard";
import PostModal from "../components/PostModal";
import { db, storage } from "../firebase"; 
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles/UpdatePage.css";
import { reload } from "firebase/auth";

const UpdatePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
   

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
  return (
    <div className="update-container">
      {/* Updates List */}
      <div className="updates-list">
        {posts
          .filter(update => update.content.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
      </div>

      {/* Search Bar & Add Post Button */}
      <div className="bottom-bar">
        <input
          type="text"
          placeholder="Search updates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="plus-button" onClick={() => setIsModalOpen(true)}>+</button>
      </div>

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
