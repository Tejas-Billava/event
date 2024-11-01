import React, { useState } from "react";
import axios from "axios";

const EventChecklist = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkedItems: {},
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      checkedItems: {
        ...formData.checkedItems,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/checklist/submitChecklist",
        formData
      );
      alert("Checklist submitted successfully!");
    } catch (error) {
      console.error("Error submitting checklist:", error);
      alert("Failed to submit checklist.");
    }
  };

  const checklistItems = [
    { label: "Event venue", name: "venue" },
    { label: "Seating arrangements", name: "seating" },
    { label: "Stage or platform", name: "stage" },
    { label: "Food and beverages", name: "catering" },
    { label: "Music and entertainment", name: "music" },
    { label: "Lighting equipment", name: "lighting" },
    { label: "Theme decorations", name: "decorations" },
    { label: "Security personnel", name: "security" },
    { label: "Parking arrangements", name: "parking" },
    { label: "First aid kits", name: "firstAid" },
  ];

  return (
    <div
      className="checklist-container"
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#2c3e50",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "white",
      }}
    >
      <form onSubmit={handleSubmit} className="checklist-form">
        <h2>Event Checklist</h2>
        <hr />

        <div style={{ marginBottom: "20px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Phone No.:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "4px",
            }}
          />
        </div>

        {checklistItems.map((item) => (
          <div
            key={item.name}
            className="checklist-item"
            style={{ marginBottom: "15px" }}
          >
            <label>
              <input
                type="checkbox"
                name={item.name}
                checked={formData.checkedItems[item.name] || false}
                onChange={handleCheckboxChange}
                style={{ marginRight: "10px" }}
              />
              {item.label}
            </label>
          </div>
        ))}

        <button
          type="submit"
          className="checklist-submit"
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            cursor: "pointer",
            backgroundColor: "#2980b9",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventChecklist;
