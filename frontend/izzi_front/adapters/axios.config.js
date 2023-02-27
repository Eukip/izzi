import axios from "axios";

const servants = {
    production: "https://izzzi.kg/api/v1",
    development: "https://izzi.sunrisetest.online/api/v1",
};

const izzi = axios.create({
    baseURL: servants[process.env.NODE_ENV],
})
export default izzi;