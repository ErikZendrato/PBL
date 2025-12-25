import axios from "axios";

const axiosCors = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default axiosCors;