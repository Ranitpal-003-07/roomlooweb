import React from 'react';
import '../styles/PGCard.css';

const PGCard = ({ pg, onClick }) => {
  // Format price with rupee symbol
  const formatPrice = (price) => {
    if (!price) return "Price not available";
   
    // If price is already formatted with ₹, return as is
    if (typeof price === 'string' && price.includes('₹')) return price;
   
    // Otherwise format it
    return `₹${parseFloat(price).toLocaleString('en-IN')}/month`;
  };

   // Generate star rating
   const renderStars = (reviews) => {
    // Calculate total rating from all reviews
    const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0) || 0;
    const averageRating = reviews?.length ? totalRating / reviews.length : 0;
    
    // Cap rating at 5 and round to nearest 0.5
    const cappedRating = Math.min(averageRating, 5);
    const roundedRating = Math.round(cappedRating * 2) / 2;
  
    // Calculate star components
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    // Create star display with accessibility in mind
    return (
      <div className="pg1-star-rating" aria-label={`Average rating: ${roundedRating} out of 5`}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="pg1-star" role="img" aria-hidden="true">
            ⭐
          </span>
        ))}
        
        {hasHalfStar && (
          <span className="pg1-star" role="img" aria-hidden="true">
            ⭒
          </span>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="pg1-star" role="img" aria-hidden="true">
            ☆
          </span>
        ))}
      </div>
    );
  };

  // Get first image or placeholder
  const cardImage = pg.images && pg.images.length > 0
    ? pg.images[0]
    : "https://via.placeholder.com/400x300?text=No+Image+Available";

  // Generate amenity icons
  const getAmenityIcons = (amenities) => {
    if (!amenities || !Array.isArray(amenities) || amenities.length === 0)
      return null;
   
    const amenityIcons = {
      "WiFi": "📶",
      "AC": "❄️",
      "Non-AC": "🌡️",
      "TV": "📺",
      "Laundry": "👕",
      "Parking": "🅿️",
      "Mess/Food": "🍽️",
      "Gym": "💪",
      "Power Backup": "🔋",
      "24/7 Water": "💧",
      "Security": "🔒",
      "Cleaning Service": "🧹",
      "Refrigerator": "❄️",
      "Washing Machine": "🧺",
      "Swimming Pool": "🏊",
      "Elevator": "🛗"
    };
   
    return amenities.slice(0, 4).map(amenity => (
      <span key={amenity} className="pg1-amenity-icon" title={amenity}>
        {amenityIcons[amenity] || '✓'}
      </span>
    ));
  };

  // Room type display
  const roomTypeDisplay = pg.roomType === 'Sharing' && pg.sharingType
    ? pg.sharingType
    : pg.roomType || "Single";

    return (
      <div className="pg1-card" onClick={() => onClick(pg)}>
        <div className="pg1-image-container">
          <img src={cardImage} alt={pg.title || "PG"} className="pg1-image" />
          <div className="pg1-badge">{roomTypeDisplay}</div>
        </div>
        <div className="pg1-info">
          <h3 className="pg1-title">{pg.title || "Unnamed PG"}</h3>
          
          {/* Rating Section */}
          <div className="pg1-rating-section">
            {renderStars(pg.reviews)}
            <div className="pg1-rating-details">
              <span className="pg1-review-count">({pg.reviews?.length || 0} reviews)</span>
            </div>
          </div>
  
          {/* Review Snippet */}
          {pg.reviews && pg.reviews.length > 0 && (
            <div className="pg1-review-snippet">
              <p className="pg1-review-text">"{pg.reviews[0].comment}"</p>
              <div className="pg1-review-meta">
                <span className="pg1-review-author">{pg.reviews[0].user}</span>
                {pg.reviews[0].date && (
                  <span className="pg1-review-date">{pg.reviews[0].date}</span>
                )}
              </div>
            </div>
          )}
  
          <p className="pg1-location">
            <span className="pg1-location-icon">📍</span>
            {pg.location || "Location not specified"}
          </p>
          <div className="pg1-amenities">
            {getAmenityIcons(pg.amenities)}
            {pg.amenities && pg.amenities.length > 4 &&
              <span className="pg1-more-amenities">+{pg.amenities.length - 4}</span>
            }
          </div>
          <div className="pg1-footer">
            <p className="pg1-price">{formatPrice(pg.price)}</p>
            <button className="pg1-view-details-button">Details</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PGCard;