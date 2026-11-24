
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch {
      setMessage("Cannot connect to the server");
    }
  }

  return (
    <main>
      <h2>Create Ventro Account</h2>
       <div className="auth-page">
        <main className="auth-card">
          <h1>🔧 Ventro</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password (8+ characters)"
          value={form.password}
          onChange={handleChange}
          minLength={8}
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="customer">Customer</option>
          <option value="professional">Professional</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {message && <p role="alert">{message}</p>}

      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
      </main>
    </div>
    </main>
  );
}

export default Register;
