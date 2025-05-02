import React, { useState } from "react";
import "../styles/PGDetailsModal.css";
import { FiX, FiPhone,FiMessageCircle,FiStar, FiMail, FiMapPin, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";


const PGDetailsModal = ({ pg, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(pg.reviews || []);
  const { user: currentUser } = useAuth();



  if (!pg) return null;

   // Chat functions
   const handleSendMessage = async (e) => {
       e.preventDefault();
       if (!message.trim() || !currentUser) return;
     
       try {
         const senderUid = currentUser.uid;
         const recipientUid = pg.ownerId;
     
         if (!senderUid || !recipientUid) {
           toast.error("Missing user information");
           return;
         }
     
         const sortedUids = [senderUid, recipientUid].sort();
         const chatId = `${sortedUids[0]}_${sortedUids[1]}`;
         const chatRef = doc(db, "chats", chatId);
     
         const chatDocSnap = await getDoc(chatRef);
     
         const newMessage = {
           sender: senderUid,
           text: message.trim(),
           timestamp: new Date(), // Optional: for sorting
         };
     
         if (!chatDocSnap.exists()) {
           // Create new chat document
           await setDoc(chatRef, {
             participants: sortedUids,
             msg: [newMessage],
             lastUpdated: new Date()
           });
         } else {
           // Add message to existing chat
           await updateDoc(chatRef, {
             msg: [newMessage, ...chatDocSnap.data().msg],
             lastUpdated: new Date()
           });
         }
     
         setMessage("");
         toast.success("Message sent!");
       } catch (error) {
         console.error("Message send error:", error);
         toast.error("Failed to send message");
       }
       setShowChat(false)
     };

    const handleReviewSubmit = async (e) => {
      e.preventDefault();
      if (reviewText.trim() && rating > 0 && pg?.id && currentUser) {
        try {
          const pgRef = doc(db, "pgListings", pg.id);
          const pgDoc = await getDoc(pgRef);
    
          if (!pgDoc.exists()) {
            throw new Error("PG listing not found");
          }
    
          const currentReviews = pgDoc.data().reviews || [];
          const existingReviewIndex = currentReviews.findIndex(
            review => review.userId === currentUser.uid
          );
    
          const newReview = {
            id: existingReviewIndex !== -1 ? currentReviews[existingReviewIndex].id : Date.now(),
            user: currentUser.fullName,
            userId: currentUser.uid,
            rating,
            comment: reviewText,
            date: new Date().toLocaleDateString(),
            timestamp: new Date().toISOString()
          };
    
          let updatedReviews;
          if (existingReviewIndex !== -1) {
            // Update existing review
            updatedReviews = [...currentReviews];
            updatedReviews[existingReviewIndex] = newReview;
          } else {
            // Add new review
            updatedReviews = [...currentReviews, newReview];
          }
    
          await updateDoc(pgRef, {
            reviews: updatedReviews
          });
    
          // Update local state
          setReviews(updatedReviews);
          setRating(0);
          setReviewText("");
          
          toast.success(
            existingReviewIndex !== -1 
              ? "Review updated successfully!" 
              : "Review submitted successfully!"
          );
        } catch (error) {
          console.error("Error submitting review:", error);
          toast.error("Failed to submit review. Please try again.");
        }
      }
    };
  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? pg.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === pg.images.length - 1 ? 0 : prev + 1
    );
  };

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return "Price not available";
    
    // If price is already formatted with ₹, return as is
    if (typeof price === 'string' && price.includes('₹')) return price;
    
    // Otherwise format it
    return `₹${Number(price).toLocaleString('en-IN')}/month`;
  };

  return (
    <div className={`pgd-overlay ${pg ? 'pgd-active' : ''}`} onClick={onClose}>
      <div className="pgd-container" onClick={(e) => e.stopPropagation()}>
        <button className="pgd-close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="pgd-content">
          {/* Image Gallery */}
          <div className="pgd-gallery">
            {pg.images && pg.images.length > 0 ? (
              <>
                <div className="pgd-main-image-wrapper">
                  <img
                    src={pg.images[currentImageIndex]}
                    alt={`${pg.title} - Image ${currentImageIndex + 1}`}
                    className="pgd-main-image"
                  />
                  
                  {pg.images.length > 1 && (
                    <>
                      <button className="pgd-nav pgd-prev" onClick={handlePrevImage}>
                        <FiChevronLeft />
                      </button>
                      <button className="pgd-nav pgd-next" onClick={handleNextImage}>
                        <FiChevronRight />
                      </button>
                      <div className="pgd-counter">
                        {currentImageIndex + 1} / {pg.images.length}
                      </div>
                    </>
                  )}
                </div>
                
                {pg.images.length > 1 && (
                  <div className="pgd-thumbnails">
                    {pg.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`pgd-thumb ${idx === currentImageIndex ? 'pgd-active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="pgd-no-image">No images available</div>
            )}
          </div>
          {/* PG Details */}
          <div className="pgd-details">
            <div className="pgd-header">
              <h2 className="pgd-title">{pg.title}</h2>
              <div className="pgd-location">
                <FiMapPin className="pgd-icon" />
                <span>{pg.location} {pg.address ? `- ${pg.address}` : ''}</span>
              </div>
              {pg.googleMapLink && (
                <a 
                  href={pg.googleMapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pgd-map-link"
                >
                  View on Google Maps
                </a>
              )}
            </div>

            <div className="pgd-price-box">
              <div className="pgd-price">
                <span className="pgd-price-amount">{formatPrice(pg.price)}</span>
              </div>
              <div className="pgd-room-type">
                {pg.roomType === 'Sharing' && pg.sharingType 
                  ? pg.sharingType 
                  : pg.roomType || "Single Room"}
              </div>
            </div>

            {/* Description */}
            {pg.description && (
              <div className="pgd-section">
                <h3 className="pgd-section-title">Description</h3>
                <p className="pgd-description">{pg.description}</p>
              </div>  
            )}

            {/* Amenities */}
            <div className="pgd-section">
              <h3 className="pgd-section-title">Amenities</h3>
              <div className="pgd-amenities">
                {pg.amenities && pg.amenities.length > 0 ? (
                  pg.amenities.map((amenity, index) => (
                    <div key={index} className="pgd-amenity">
                      <span className="pgd-check">✓</span>
                      {amenity}
                    </div>
                  ))
                ) : (
                  <p className="pgd-no-data">No amenities listed</p>
                )}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="pgd-section">
              <h3 className="pgd-section-title">Nearby Places</h3>
              <div className="pgd-nearby">
                {pg.nearbyCollege && (
                  <div className="pgd-nearby-item">
                    <span className="pgd-nearby-label">College:</span>
                    <span className="pgd-nearby-value">{pg.nearbyCollege}</span>
                  </div>
                )}
                {pg.nearbyMetro && (
                  <div className="pgd-nearby-item">
                    <span className="pgd-nearby-label">Metro Station:</span>
                    <span className="pgd-nearby-value">{pg.nearbyMetro}</span>
                  </div>
                )}
                {pg.nearbyBusStand && (
                  <div className="pgd-nearby-item">
                    <span className="pgd-nearby-label">Bus Stand:</span>
                    <span className="pgd-nearby-value">{pg.nearbyBusStand}</span>
                  </div>
                )}
                {pg.nearbyLandmark && (
                  <div className="pgd-nearby-item">
                    <span className="pgd-nearby-label">Landmark:</span>
                    <span className="pgd-nearby-value">{pg.nearbyLandmark}</span>
                  </div>
                )}
                {!pg.nearbyCollege && !pg.nearbyMetro && !pg.nearbyBusStand && !pg.nearbyLandmark && (
                  <p className="pgd-no-data">No nearby places information available</p>
                )}
              </div>
            </div>

            {/* Rules */}
            {pg.rules && (
              <div className="pgd-section">
                <h3 className="pgd-section-title">House Rules</h3>
                <p className="pgd-rules">{pg.rules}</p>
              </div>
            )}

            {/* Contact Information */}
            <div className="pgd-section pgd-contact">
              <h3 className="pgd-section-title">Contact Information</h3>
              <div className="pgd-contact-buttons">
                <button 
                  className="pgd-contact-btn pgd-chat"
                  onClick={() => setShowChat(true)}
                >
                  <FiMessageCircle className="pgd-icon" /> Chat
                </button>
                {pg.ownerPhone && (
                  <a href={`tel:${pg.ownerPhone}`} className="pgd-contact-btn pgd-phone">
                    <FiPhone className="pgd-icon" /> Call Owner
                  </a>
                )}
                {pg.ownerEmail && (
                  <a href={`mailto:${pg.ownerEmail}`} className="pgd-contact-btn pgd-email">
                    <FiMail className="pgd-icon" /> Email Owner
                  </a>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pgd-section">
              <h3 className="pgd-section-title">Reviews ({reviews.length})</h3>
              
              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="pgd-review-form">
                <div className="pgd-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`pgd-star ${star <= rating ? 'pgd-filled' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      <FiStar />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  rows="3"
                />
                <button type="submit" className="pgd-submit-review">
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="pgd-reviews-list">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="pgd-review">
                      <div className="pgd-review-header">
                        <span className="pgd-review-user">{review.user}</span>
                        <div className="pgd-review-rating">
                          {[...Array(review.rating)].map((_, i) => (
                            <FiStar key={i} className="pgd-filled" />
                          ))}
                        </div>
                        <span className="pgd-review-date">{review.date}</span>
                      </div>
                      <p className="pgd-review-comment">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="pgd-no-data">No reviews yet. Be the first to write one!</p>
                )}
              </div>
            </div>

            {/*chat section */}
            {showChat && (
              <div className="pgd-chat-panel">
                <div className="pgd-chat-header">
                  <h3>Chat with {pg.ownerName || "PG Owner"}</h3>
                  <button onClick={() => setShowChat(false)}>
                    <FiX />
                  </button>
                </div>
                <form onSubmit={handleSendMessage} className="pgd-chat-input">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDetailsModal;