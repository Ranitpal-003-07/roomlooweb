import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { FiCheck, FiX, FiCreditCard } from "react-icons/fi";
import "../styles/Subscription.css";


const Subscription = () => {
  const {  user } = useAuth();
  const currentUser = user;
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    isSubscribed: false,
    plan: null,
    expiryDate: null
  });
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Subscription plans configuration
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 4,
      duration: 1, // months
      features: [
        "Post up to 2 PG listings",
        "Basic listing visibility",
        "Email support",
        "30 days validity"
      ],
      notIncluded: [
        "Featured listings",
        "Priority customer support",
        "Advanced analytics"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 999,
      duration: 3, // months
      features: [
        "Post up to 5 PG listings",
        "Enhanced listing visibility",
        "Featured listings",
        "Priority email support",
        "Basic analytics dashboard",
        "90 days validity"
      ],
      notIncluded: [
        "Phone support",
        "Advanced analytics"
      ]
    },
    {
      id: "unlimited",
      name: "Unlimited",
      price: 1999,
      duration: 12, // months
      features: [
        "Unlimited PG listings",
        "Maximum listing visibility",
        "Featured listings",
        "Priority phone & email support",
        "Advanced analytics dashboard",
        "365 days validity"
      ],
      notIncluded: []
    }
  ];

  // Fetch current subscription status
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const subscription = userData.subscription || {};
          
          // Check if subscription is active
          const isActive = subscription.status === 'active';
          const expiryDate = subscription.expiryDate 
            ? new Date(subscription.expiryDate.seconds * 1000) 
            : null;
          const isExpired = expiryDate ? expiryDate < new Date() : true;
          
          setSubscriptionData({
            isSubscribed: isActive && !isExpired,
            plan: subscription.plan,
            expiryDate: expiryDate
          });
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [currentUser]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // Handle Razorpay payment initiation
  const handlePayment = (plan) => {
    setProcessing(true);
    
    // Create a Razorpay order
    const createRazorpayOrder = async () => {
      try {
        const response = await fetch(
          "https://createorder-ezcljhodfa-uc.a.run.app",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: plan.price }),
          }
        );
    
        if (!response.ok) {
          throw new Error("Failed to create order");
        }
    
        const orderData = await response.json();
        return orderData.id; // Return the order ID from Razorpay
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
        throw error;
      }
    };
    

    // Initialize and open Razorpay payment
    const initializeRazorpay = async (orderId) => {
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        setProcessing(false);
        return;
      }

      const options = {
        key: "rzp_test_3W0tTbO7uTN3Yt", // Replace with your actual Razorpay key
        amount: plan.price * 100, // Amount in paise
        currency: "INR",
        name: "PG Finder",
        description: `${plan.name} Subscription for ${plan.duration} months`,
        order_id: orderId,
        handler: function(response) {
          // Handle successful payment
          handlePaymentSuccess(response, plan);
        },
        prefill: {
          name: currentUser?.displayName || "",
          email: currentUser?.email || "",
          contact: currentUser?.phoneNumber || ""
        },
        notes: {
          plan_id: plan.id,
          user_id: currentUser.uid
        },
        theme: {
          color: "#6b46c1"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert(response.error.description);
        setProcessing(false);
      });
      
      rzp.open();
    };

    // Execute payment flow
    createRazorpayOrder()
      .then(orderId => initializeRazorpay(orderId))
      .catch(error => {
        console.error("Payment initialization failed:", error);
        setProcessing(false);
      });
  };

  // Handle successful payment completion
  const handlePaymentSuccess = async (paymentResponse, plan) => {
    try {
      const verification = await fetch(" https://verifypayment-ezcljhodfa-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        }),
      });
  
      const verificationData = await verification.json();
      if (!verificationData.valid) throw new Error("Payment verification failed");
  
      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + plan.duration);
  
      // Save to Firestore
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        subscription: {
          status: "active",
          plan: plan.id,
          startDate: serverTimestamp(),
          expiryDate: expiryDate,
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
        },
      });
  
      // Update state
      setSubscriptionData({
        isSubscribed: true,
        plan: plan.id,
        expiryDate: expiryDate,
      });
  
      alert(`Thank you! Your ${plan.name} subscription has been activated successfully.`);
    } catch (error) {
      console.error("Error processing payment success:", error);
      alert("There was an issue with your payment. Please contact support.");
    } finally {
      setProcessing(false);
    }
  };
  

  // Render current subscription details
  const renderCurrentSubscription = () => {
    if (!subscriptionData.isSubscribed) return null;
    
    return (
      <div className="current-subscription">
        <h2>Your Current Subscription</h2>
        <div className="subscription-details">
          <div className="subscription-info">
            <h3>{plans.find(p => p.id === subscriptionData.plan)?.name || 'Active'} Plan</h3>
            {subscriptionData.expiryDate && (
              <p className="expiry-info">
                Valid until: <span>{subscriptionData.expiryDate.toLocaleDateString()}</span>
              </p>
            )}
          </div>
          <div className="subscription-badge">Active</div>
        </div>
        <p className="renew-message">
          You can renew or upgrade your plan at any time. Your new subscription will start after your current plan expires.
        </p>
      </div>
    );
  };

  // Render subscription plans
  const renderPlans = () => {
    return (
      <div className="subscription-plans">
        <h2>{subscriptionData.isSubscribed ? "Upgrade or Renew Your Plan" : "Choose a Subscription Plan"}</h2>
        <div className="plans-container">
          {plans.map(plan => (
            <div 
              key={plan.id} 
              className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${
                subscriptionData.plan === plan.id ? 'current-plan' : ''
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {subscriptionData.plan === plan.id && <div className="current-plan-badge">Current Plan</div>}
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price}</span>
                  <span className="duration">/{plan.duration} month{plan.duration > 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-included">
                    <FiCheck className="feature-icon included" />
                    <span>{feature}</span>
                  </li>
                ))}
                
                {plan.notIncluded.map((feature, index) => (
                  <li key={index} className="feature-not-included">
                    <FiX className="feature-icon not-included" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className="select-plan-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePayment(plan);
                }}
                disabled={processing}
              >
                <FiCreditCard />
                {processing && selectedPlan === plan.id ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render page based on loading state
  if (loading) {
    return (
      <div className="subscription-container loading">
        <div className="loading-spinner"></div>
        <p>Loading subscription information...</p>
      </div>
    );
  }
  
  return (
    <div className="subscription-container">
      <div className="subscription-header">
        <h1>Subscription Plans</h1>
        <p>Choose the perfect plan for your PG listing needs</p>
      </div>
      
      {renderCurrentSubscription()}
      {renderPlans()}
      
      <div className="subscription-footer">
        <div className="payment-security">
          <FiCreditCard className="security-icon" />
          <div>
            <h4>Secure Payments</h4>
            <p>All transactions are processed securely via Razorpay</p>
          </div>
        </div>
        
        <div className="subscription-faq">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-items">
            <div className="faq-item">
              <h4>How do I cancel my subscription?</h4>
              <p>You can cancel your subscription anytime from your account settings. Your benefits will continue until the end of your billing period.</p>
            </div>
            <div className="faq-item">
              <h4>Will my subscription auto-renew?</h4>
              <p>No, subscriptions don't auto-renew. You'll need to manually renew your subscription before it expires.</p>
            </div>
            <div className="faq-item">
              <h4>Can I upgrade my plan?</h4>
              <p>Yes, you can upgrade your plan at any time. Your new subscription will start after your current plan expires.</p>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Subscription;