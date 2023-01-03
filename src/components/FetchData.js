import axios from "axios";

function fetchData(url) {
  axios.get(url).then((res) => {
    //console.log(res.data);
    return res.data;
  });
}

export { fetchData };
