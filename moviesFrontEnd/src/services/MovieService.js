import axios from "axios"

export default {
  async getSearchResults(search) {
    let res = await axios.get("http://localhost:8000/movies/" + search);
    return res.data;
  }
}