import axios from "axios";

const baseURL = "https://reqres.in/api/users";

function get(url) {
    return axios.get(baseURL + url);
}

const exportFun = {
    get
};

export default exportFun;