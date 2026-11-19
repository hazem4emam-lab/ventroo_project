
import { useState } from "react";

function CreateRequest() {
  const [formData, setFormData] = useState({
    professional: "",
    description: "",
    serviceAddress: "",
    preferredDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("Form completed! Backend connection is the next step.");
  };

  return (
    <div>
      <h2>Create Service Request</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Professional ID</label>
          <input
            type="text"
            name="professional"
            value={formData.professional}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Service Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Service Address</label>
          <input
            type="text"
            name="serviceAddress"
            value={formData.serviceAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <button type="submit">Submit Request</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateRequest;
