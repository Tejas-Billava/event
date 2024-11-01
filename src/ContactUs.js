import React, { useState } from "react";
import "./ContactUs.css"; // Import the CSS file for styling

function ContactUs({ contactRef }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contactData = { name, email, message };

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
        // Reset form fields after successful submission
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await response.json(); // Ensure we catch any error messages
        console.error("Submission failed:", data);
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="contact-us-container" ref={contactRef}>
      <h1>Contact Us</h1>
      <div className="contact-info">
        <h2>Our Address</h2>
        <p>
          Bhavan's Campus, Old D N Nagar, Munshi Nagar, Andheri West, Mumbai,
          Maharashtra 400058
        </p>
        <p>Bharatiya Vidya Bhavan's</p>
        <p>Sardar Patel Institute of Technology (SPIT)</p>
        <h2>Phone</h2>
        <p>+91 9820308567</p>
        <h2>Email</h2>
        <p>eventify@gmail.com</p>
      </div>
      <div className="map-container">
        <h2>Find Us on the Map</h2>
        <iframe
          width="520"
          height="520"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          id="gmap_canvas"
          src="https://maps.google.com/maps?width=520&amp;height=520&amp;hl=en&amp;q=New%20York%20+(Eventify)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Google Map"
        ></iframe>
        <script
          type="text/javascript"
          src="https://embedmaps.com/google-maps-authorization/script.js?id=3ab60a71a2eda992d5f9b96faaf16a2134d5ce8c"
        ></script>
      </div>
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
        {showSuccessMessage && (
          <p className="success-message">
            Message sent successfully! Thank you for contacting us.
          </p>
        )}
        {showErrorMessage && (
          <p className="error-message">
            There was an error sending your message. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
