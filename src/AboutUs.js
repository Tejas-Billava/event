import React from "react";
import aboutImage1 from "./images/about1.jpeg"; // Add images to your project folder
import aboutImage2 from "./images/about2.jpg";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <h1 className="about-title">About Us</h1>

      <div className="about-container">
        <div className="about-content">
          <p>
            Welcome to <strong>Eventify</strong>, where we turn your dreams into
            unforgettable moments! We specialize in creating magical events that
            leave lasting memories. From grand weddings to corporate events and
            birthdays, we bring your vision to life.
          </p>
          <p>
            Our team of creative designers and expert planners ensures that
            every detail is perfect, so you can enjoy a seamless, stress-free
            experience.
          </p>
          <p>
            <strong>Let’s craft something extraordinary together!</strong>
          </p>
        </div>

        <div className="about-images">
          <img src={aboutImage1} alt="Event planning" className="about-image" />
          <img src={aboutImage2} alt="Celebration" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
