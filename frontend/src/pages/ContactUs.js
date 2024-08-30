import HeroPicture from "../assets/ContactUs.jpeg";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const ContactUs = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Contact us concerning...");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/nodemailer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        type: 'contact'
      }),
    });
  
    if (response.ok) {
      // Handle successful response (e.g., show a success message or reset form)
      console.log("Form submitted successfully");
      setName('')
      setEmail('')
      setSubject("Contact us concerning...")
      setMessage('')
    } else {
      // Handle error response (e.g., show an error message)
      console.error("Form submission failed");
    }
  };
  

  const handleSubjectChange = (subject) => {
    setSubject(subject);
  };

  return (
    <div className="row gx-4 gx-lg-5 align-items-center my-3">
      <div className="col-lg-7">
        <img className="img-fluid rounded-4 mb-2 mb-lg-0" src={HeroPicture} alt="Contact Us"/>
      </div>
      <div className="col-lg-5">
        <h1 className="font-weight-light">Contact Us</h1>
        <p className="fs-5 mb-3">
          The best way to contact us is to use our contact form below. Please
          fill out all of the required fields and we will get back to you as
          soon as possible.
        </p>
        <hr className="mx-auto my-5 my-xl-9 border-dark-subtle" />
        <div className="border rounded shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="row gy-3 gy-xl-3 p-4 p-xl-5">
              <div className="col-12">
                <label htmlFor="fullname" className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="form-control"
                    name="email"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="subject" className="form-label">
                  Subject <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  <option value="">Select a subject...</option>
                  <option value="Finance Consultation">Finance Consultation</option>
                  <option value="Administration">Administration</option>
                  <option value="Suggestions">Suggestions</option>
                  <option value="Suggestions">Other</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="message" className="form-label">
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  name="message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
