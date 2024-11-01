import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WeddingPage = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/venues");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="wedding-page">
      <h1 className="page2-header">Wedding Venues</h1>
      <div className="wedding-images">
        {venues.map((venue) => (
          <div className="wedding-item" key={venue._id}>
            <img src={venue.image} alt={venue.name} className="wedding-image" />
            <h2 className="wedding-name">{venue.name}</h2>
            <ul className="venue-details">
              {venue.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
            <Link to="/bookings">
              <button className="plan-button">Book Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingPage;
