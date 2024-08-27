import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import HeroPicture from "../assets/HeroPicture.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div class="row gx-4 gx-lg-5 align-items-center my-3">
      <div class="col-lg-7">
        <img class="img-fluid rounded-4 mb-2 mb-lg-0 " src={HeroPicture} />
      </div>
      <div class="col-lg-5">
        <form onSubmit={handleSubmit}>
          <h1 class="h3 mb-3 fw-normal">You’re back! Time to make your next crypto move</h1>

          <div class="form-floating">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              class="form-control"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating my-2">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              class="form-control"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-lg btn-primary" type="submit">
            Login
          </button>
          {error && <div class="mt-2 text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
