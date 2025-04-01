/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentDots, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons"; // Regular heart icon
import { storage, db } from "../firebase"; // Firebase imports
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../styles/UpdateCard.css";

const UpdateCard = ({ update }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(update.likes);
  const [comments, setComments] = useState(update.comments);
  const [shares, setShares] = useState(update.shares);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [userPic, setUserPic] = useState(""); // State to hold the user's profile picture URL

  useEffect(() => {
    const fetchUserPic = async () => {
      try {
        const userRef = doc(db, "users", update.userId); // Assuming userId is stored in the update
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Check if the user has a profile picture in Firebase Storage
          if (userData.profilePic) {
            const imageUrl = await getDownloadURL(ref(storage, userData.profilePic)); // Fetch profile picture URL
            setUserPic(imageUrl);
          } else {
            // If no profile picture in Storage, use the Google profile picture
            if (userRef && userData.photoURL) { // Assuming the email is stored in the update
              setUserPic(update.photoURL); // Get Google profile picture URL
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPic(); // Call the function to fetch user profile picture
  }, [update.userId, update.photoURL]); // Dependency on userId and photoURL to fetch the correct profile picture

  const handleLike = async () => {
    const newLikeState = !liked;
    setLiked(newLikeState);
    const updatedLikes = newLikeState ? likes + 1 : likes - 1;
    setLikes(updatedLikes);

    // Update the Firestore document with the new likes count
    try {
      const postRef = doc(db, "posts", update.id); // Reference to the post document
      await updateDoc(postRef, {
        likes: updatedLikes,
      });
    } catch (error) {
      console.error("Error updating likes in Firestore:", error);
    }
  };

  const handleComment = async () => {
    if (newComment.trim()) {
      const updatedCommentList = [...commentList, newComment];
      setCommentList(updatedCommentList);
      setNewComment("");
      const updatedComments = comments + 1;
      setComments(updatedComments);

      // Update the Firestore document with the new comments count and comment list
      try {
        const postRef = doc(db, "posts", update.id); // Reference to the post document
        await updateDoc(postRef, {
          comments: updatedCommentList,
          commentsCount: updatedComments,
        });
      } catch (error) {
        console.error("Error updating comments in Firestore:", error);
      }
    }
  };

  const handleShare = async () => {
    const updatedShares = shares + 1;
    setShares(updatedShares);

    // Update the Firestore document with the new shares count
    try {
      const postRef = doc(db, "posts", update.id); // Reference to the post document
      await updateDoc(postRef, {
        shares: updatedShares,
      });
    } catch (error) {
      console.error("Error updating shares in Firestore:", error);
    }
  };

  const toggleCommentSection = () => {
    setShowComments(!showComments);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  return (
    <div className="update-card">
      <div className="update-header">
        {/* Show the user's profile picture or a default image */}
        <img 
          src={userPic || "/assets/usr1.jpg"} 
          alt="User" 
          className="user-avatar" 
        />
        <h3 className="username">{update.user}</h3>
      </div>
      <p className="update-content">{update.content}</p>
      {update.image && <img src={update.image} alt="update" className="update-image" />}

      <div className="actions">
        <button className={`like-btn ${liked ? "liked" : ""}`} onClick={handleLike}>
          <FontAwesomeIcon icon={liked ? faHeart : faRegularHeart} className="icon" color={liked ? "red" : "white"} />
          {likes}
        </button>

        <button className="comment-btn" onClick={toggleCommentSection}>
          <FontAwesomeIcon icon={faCommentDots} className="icon" color="#00bfff" /> {comments}
        </button>

        <button className="share-btn" onClick={toggleShareOptions}>
          <FontAwesomeIcon icon={faShareAlt} className="icon" color="#2ecc71" /> {shares}
        </button>
      </div>

      {showComments && (
        <div className="comment-section">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleComment}>Post</button>
          {commentList.map((cmt, index) => (
            <p key={index} className="comment">{cmt}</p>
          ))}
        </div>
      )}

      {showShareOptions && (
        <div className="share-options">
          <button onClick={handleShare}>📲 WhatsApp</button>
          <button onClick={handleShare}>📘 Facebook</button>
          <button onClick={handleShare}>🐦 Twitter</button>
          <button onClick={() => setShowShareOptions(false)}>❌ Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UpdateCard;
