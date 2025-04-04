/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../styles/PostModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { storage, db, auth } from "../firebase"; // Import Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const PostModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState(""); // Local state for description
  const [image, setImage] = useState(null); // Local state for image
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const { user } = useAuth();


  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Update local state with the uploaded image
    }
  };

  // Handle form submission (creating a new post)
  const handleSubmit = async () => {
    if (description.trim() || image) {
      setIsUploading(true);

      let imageUrl = null;

      // Upload image to Firebase Storage if there's one
      if (image) {
        const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Get current authenticated user data
      const userId = user ? user.uid : null; // User ID
      const userName = user ? user.displayName : "Anonymous"; // User Name

      // Save post data to Firestore
      await addDoc(collection(db, "posts"), {
        user: userName, // Save user name or default to "Anonymous"
        userId: userId || "unknown", // Save user ID or default to "unknown"
        content: description,
        image: imageUrl || null,
        likes: 0,
        comments: [], // Initialize as an empty array to hold comments
        shares: 0,
        timestamp: serverTimestamp(),
      });

      setIsUploading(false);
      onClose(); // Close the modal
    }
  };

  // Reset form when modal is opened
  useEffect(() => {
    if (!isUploading) {
      setDescription(""); // Reset description state
      setImage(null); // Reset image state
    }
  }, [isUploading]);

  return (
    <div className="post-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Create a Post</h2>
        <textarea
          placeholder="Write something interesting..."
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Handle description input
        />
        <div className="image-preview">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Preview" className="preview-image" />
          ) : (
            <p>No Image</p>
          )}
        </div>
        <label className="upload-btn12">
          <FontAwesomeIcon icon={faImage} /> Add Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        {/* File upload button */}

        <button className="submit-btn" onClick={handleSubmit} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostModal;
