import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:5000",
// });

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.SERVER_API_URL
      : "http://localhost:5000",
});
