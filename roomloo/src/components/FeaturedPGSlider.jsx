import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import our custom styles
import "../styles/styles.css";

const featuredPGs = [
  { id: 2, image: "/assets/plc2.jpg", title: "Affordable PG in Delhi", rating: 4.8, price: "₹8,000/mo" },
  { id: 3, image: "/assets/plc3.jpg", title: "Cozy PG in Mumbai", rating: 4.6, price: "₹10,500/mo" },
  { id: 1, image: "/assets/plc1.jpg", title: "Luxury PG in Bangalore", rating: 4.9, price: "₹15,000/mo" },
  { id: 4, image: "/assets/plc2.jpg", title: "Premium PG in Hyderabad", rating: 4.7, price: "₹12,000/mo" },
];

const FeaturedPGSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Custom navigation buttons
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <div className="pg-slider-container">
      {/* Background decoration */}
      <div className="pg-background-decorations">
        <div className="pg-background-blob-1"></div>
        <div className="pg-background-blob-2"></div>
      </div>
      
      {/* Content container */}
      <div className="pg-content-wrapper">
        {/* Section header */}
        <div className="pg-section-header">
          <h2 className="pg-section-title">Curated Living Spaces</h2>
          <div className="pg-section-divider"></div>
          <p className="pg-section-subtitle">Discover thoughtfully designed PG accommodations that blend comfort, style, and convenience</p>
        </div>
        
        {/* Slider */}
        <div className="pg-slider-wrapper">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            initialSlide={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            className="pg-slider"
          >
            {featuredPGs.map((pg) => (
              <SwiperSlide key={pg.id}>
                <div className="pg-card">
                  {/* Image container */}
                  <div className="pg-image-container">
                    <img 
                      src={pg.image} 
                      alt={pg.title} 
                      className="pg-image"
                    />
                    <div className="pg-price-badge">
                      {pg.price}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="pg-card-content">
                    <div className="pg-location">
                      <MapPin size={16} />
                      <span>{pg.title.split(" in ")[1]}</span>
                    </div>
                    
                    <h3 className="pg-title">{pg.title.split(" in ")[0]}</h3>
                    
                    <div className="pg-rating-container">
                      <div className="pg-rating">
                        <div className="pg-stars">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`pg-star ${i < Math.floor(pg.rating) ? "pg-star-filled" : "pg-star-empty"}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="pg-rating-text">{pg.rating}</span>
                      </div>
                    </div>
                    
                    <div>
                      <button className="pg-button">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons */}
          <button 
            ref={navigationPrevRef} 
            className="pg-nav-button pg-nav-prev"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            ref={navigationNextRef} 
            className="pg-nav-button pg-nav-next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Bottom indicators */}
        <div className="pg-progress-indicators">
          {featuredPGs.map((_, index) => (
            <div 
              key={index} 
              className={`pg-progress-dot ${activeIndex === index ? "pg-progress-dot-active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPGSlider;