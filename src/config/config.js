const API_URL =
  process.env.NODE_ENV === "skailama"
    ? "https://skailama-backend.onrender.com"
    : "http://localhost:3004";

export { API_URL };