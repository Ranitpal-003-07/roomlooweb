import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentDots, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons"; // Regular heart icon
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

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setCommentList([...commentList, newComment]);
      setNewComment("");
      setComments(comments + 1);
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
        <img src="https://source.unsplash.com/50x50/?person" alt="User" className="user-avatar" />
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
          <button onClick={() => alert("Shared on WhatsApp!")}>📲 WhatsApp</button>
          <button onClick={() => alert("Shared on Facebook!")}>📘 Facebook</button>
          <button onClick={() => alert("Shared on Twitter!")}>🐦 Twitter</button>
          <button onClick={() => setShowShareOptions(false)}>❌ Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UpdateCard;
