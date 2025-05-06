import React from "react";
import FeaturedPGSlider from "../components/FeaturedPGSlider";
import "../styles/Home.css"; 

const HomeSection = () => {
  return (
    <div className="hm-section">
      {/* Hero Section */}
      <div className="hm-hero">
      {/* Left Content Area */}
      <div className="hm-left-side">
        {/* Stats Cards */}
        <div className="hm-top-div">
          <div className="hm-first">
            <p className="hm-head-text">20+</p>
            <p className="hm-sub-text">LOCATIONS</p>
            <div className="hm-places-logo">
              <img src="/assets/plc1.jpg" className="hm-icon1" alt="Delhi" />
              <img src="/assets/plc2.jpg" className="hm-icon1" alt="Mumbai" />
              <img src="/assets/plc3.jpg" className="hm-icon1" alt="Bangalore" />
            </div>
          </div>
          <div className="hm-second">
            <p className="hm-head-text">1K+</p>
            <p className="hm-sub-text">VERIFIED PGs</p>
            <div className="hm-places-logo">
              <img src="/assets/house.png" className="hm-icon1" alt="Hostel" />
              <img src="/assets/house1.png" className="hm-icon1" alt="Apartment" />
            </div>
          </div>
        </div>

        {/* Tagline and CTA */}
        <div className="hm-bottom-div">
          <p className="hm-tagline">Swipe, Match and Move In!</p>
          <div className="hm-bt">
            <div className="hm-lt">
              <img src="/assets/usr1.jpg" className="hm-icon2" alt="User 1" />
              <img src="/assets/usr2.jpg" className="hm-icon2" alt="User 2" />
              <img src="/assets/usr3.jpg" className="hm-icon2" alt="User 3" />
            </div>
            <div className="hm-rt">
              <img src="/assets/arrw.png" className="hm-icon2" alt="Explore" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Area */}
      <div className="hm-right-side">
        <div className="hm-right-side-sub">
          <div className="hm-off-txt1">
            <p className="hm-off-sub">On First Booking</p>
          </div>
          <div className="hm-off-txt2">
            <p className="hm-off-head">20% OFF</p>
          </div>
        </div>
      </div>

      {/* Background Elements - Added via CSS */}
      <img src="/assets/bgimg.webp" className="hm-bg" alt="Background Pattern" />
    </div>

      {/* Featured PGs Section */}
      <div className="hm-featured">
        <FeaturedPGSlider />
      </div>

      {/* Roomloo Introduction */}
      <div className="hm-intro">
        <h1 className="hm-title">Welcome to Roomloo</h1>
        <p className="hm-description">
          Delhi's go-to no-broker platform built especially for students and PG owners.
          Whether you're hunting for a place to stay or listing your property – we're here
          to make the whole process smart, simple, and stress-free.
        </p>
      </div>

      {/* User Types Section */}
      <div className="hm-user-types">
        <div className="hm-user-card">
          <h2 className="hm-user-title">For Students</h2>
          <ul className="hm-benefits-list">
            <li>No brokerage</li>
            <li>Swipe and match with PGs and roommates that suit your vibe</li>
            <li>Explore real listings verified by users</li>
            <li>Stay updated on campus events and seminars</li>
          </ul>
          <button className="hm-action-button">Find Your PG</button>
        </div>
        <div className="hm-user-card">
          <h2 className="hm-user-title">For PG Owners</h2>
          <ul className="hm-benefits-list">
            <li>List your PG with 100% transparency</li>
            <li>No more chasing brokers or waiting on appointments</li>
            <li>Engage with genuine student profiles</li>
            <li>Get visibility with a minimal, one-time subscription</li>
          </ul>
          <button className="hm-action-button">List Your Property</button>
        </div>
      </div>

      {/* Room Types Navigation */}
      <div className="hm-navigation">
        <h2 className="hm-nav-title">Find Your Perfect Room</h2>
        <div className="hm-nav-items">
          <div className="hm-nav-card">
            <h3>10 Beds</h3>
            <p>Mixed Dormitory Rooms</p>
          </div>
          <div className="hm-nav-card">
            <h3>8 Beds</h3>
            <p>AC Dormitory Rooms</p>
          </div>
          <div className="hm-nav-card">
            <h3>6 Beds</h3>
            <p>Mixed Dormitory Rooms</p>
          </div>
          <div className="hm-nav-card">
            <h3>Family Room</h3>
            <p>4 Beds 2 Baths</p>
          </div>
          <div className="hm-nav-card">
            <h3>3 BHK Apartment</h3>
            <p>1 Bunk Bed, 2 Double Beds</p>
          </div>
        </div>
      </div>

      {/* Featured PGs */}
      <div className="hm-container">
        {/* Main Content */}
        <div className="hm-main-content">
          <h2 className="hm-content-title">Reserve and Enjoy</h2>
          <h3 className="hm-content-subtitle">Unforgettable Memories</h3>
          <p className="hm-content-text">
            These services aim to create a comfortable and supportive living environment
          </p>
        </div>

        {/* Cards Section */}
        <div className="hm-cards-container">
          {[
            {
              img: "https://storage.googleapis.com/a1aa/image/wA7ftKCNr9LShe7g7DGqw1aOD-r59Jvvajganz51c_c.jpg",
              title: "Furnished dormitories with facilities",
              price: "$12.23",
            },
            {
              img: "https://storage.googleapis.com/a1aa/image/yc3VUKhEWNgCVL7sFXC6HizlY_sRcVRZSsZZycG-wYI.jpg",
              title: "A well-designed dormitory",
              price: "$18.25",
            },
            {
              img: "https://storage.googleapis.com/a1aa/image/Xx8RNvToR1Sm1Du0OAvGLjqAEMhUQiJoPCq4dsC3mi4.jpg",
              title: "Providing rooms for students",
              price: "$18.23",
            },
            {
              img: "https://storage.googleapis.com/a1aa/image/8UJ10gRjQz1nDWuSwAew91_Tb_0YWSi1RLCqpznN7IY.jpg",
              title: "We provide 10 beds dormitories",
              price: "$32.23",
            },
          ].map((item, index) => (
            <div key={index} className="hm-card">
              <img src={item.img} alt={item.title} className="hm-card-img" />
                <div className="hm-card-content">
                <p>{item.title}</p>
              </div>
              <div className="hm-arrow-icon">➜</div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="hm-community-section">
        <h2 className="hm-community-title">We're Building a Community</h2>
        <p className="hm-community-text">
          A space where students and PG owners connect openly, fairly, and hassle-free.
          Whether you're finding a room or listing one, Roomloo is where your search ends.
        </p>
        <div className="hm-cta-buttons">
          <button className="hm-cta-student">I'm a Student</button>
          <button className="hm-cta-owner">I'm a PG Owner</button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="hm-testimonials">
        <h2 className="hm-test-title">What Our Users Say</h2>
        <div className="hm-testimonial-cards">
          <div className="hm-testimonial">
            <img src="/assets/usr1.jpg" alt="User" className="hm-test-img" />
            <p className="hm-test-text">
              "Found my perfect PG without paying any brokerage. The roommate matching feature is amazing!"
            </p>
            <p className="hm-test-author">- Aman, Delhi University</p>
          </div>
          <div className="hm-testimonial">
            <img src="/assets/usr2.jpg" alt="User" className="hm-test-img" />
            <p className="hm-test-text">
              "As a PG owner, I've connected with genuine students who are respectful of my property."
            </p>
            <p className="hm-test-author">- Priya, PG Owner in North Campus</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;