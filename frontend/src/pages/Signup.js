import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import HeroPicture from "../assets/HeroPicture.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added name state
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);

    // Fetch to send a signup email
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/nodemailer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Handle token, only attach it if the user is already authenticated
        ...(user && { Authorization: `Bearer ${user.token}` }),
      },
      body: JSON.stringify({
        name: name,
        email,
        subject: 'Welcome to Crypto Currency Viewer!',
        message: 'We are excited to have you join us on this journey!',
        type: 'signup'
      }),
    });

    if (response.ok) {
      console.log("Signup email sent successfully");
    } else {
      console.error("Failed to send signup email");
    }
  };

  return (
    <div className="row gx-4 gx-lg-5 align-items-center my-3">
      <div className="col-lg-7">
        <img className="img-fluid rounded-4 mb-2 mb-lg-0" src={HeroPicture} alt="Hero" />
      </div>
      <div className="col-lg-5">
        <form className="login" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">
            Your crypto future begins here. Let’s make it official!
          </h1>

          <div className="form-floating mb-2">
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Full Name"
              required
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>
          
          <div className="form-floating mb-2">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          
          <div className="form-floating mb-2">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button 
            className="btn btn-lg btn-primary" 
            type="submit"
            disabled={isLoading}  // Disable button while loading
          >
            Sign up
          </button>
          
          {error && <div className="mt-2 text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
