import axios from "axios";

const fetchData = async (url) => {
  axios.get(url).then((res) => {
    const temp = res.data;
    /* console.log(res.data); */
    return temp;
  });
};

export { fetchData };

/* export const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Aw no, something went sideways");
    const pokemon = await res.json();
    return { pokemon };
  } catch (error) {
    return { error };
  }
}; */
