import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/nodemailer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${json.token}`,
          },
          body: JSON.stringify({
            name: name,
            email,
            subject: "Welcome to Crypto Currency Viewer!",
            message: "We are excited to have you join us on this journey!",
            type: "signup",
          }),
        }
      );

      if (response.ok) {
        console.log("Signup email sent successfully");
      } else {
        console.error("Failed to send signup email");
      }
    }
  };

  return { signup, isLoading, error };
};
