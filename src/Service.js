import React from "react";
import { Link } from "react-router-dom";
import service1 from "./images/Wedding2.jpeg";
import service2 from "./images/Birthday.avif";
import service3 from "./images/Corporate.jpg";
// import CreateOwnEvent from "./CreateOwnEvent";
const Service = () => {
  return (
    <div id="services" className="services-page">
      <div className="header-container">
        <h2>Our Services</h2>
        {/* <button className="explore-all-button">
          <Link to="/CreateOwnEvent">Create Your Own Event</Link>
        </button> */}
      </div>

      <div className="service-images">
        <div className="service-item">
          <h3 className="service-heading">Wedding</h3>
          <img src={service1} alt="Wedding" className="service-image" />
          <Link to="/wedding" className="service-button">
            Explore
          </Link>
        </div>

        <div className="service-item">
          <h3 className="service-heading">Birthday</h3>
          <img src={service2} alt="Birthday" className="service-image" />
          <Link to="/birthday" className="service-button">
            Explore
          </Link>
        </div>

        <div className="service-item">
          <h3 className="service-heading">Corporate</h3>
          <img src={service3} alt="Corporate" className="service-image" />
          <Link to="/corporate" className="service-button">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Service;
