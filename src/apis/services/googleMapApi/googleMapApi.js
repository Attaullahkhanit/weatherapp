import axios from "axios";

const getgooglemap = () => {
  const apiKey = "AIzaSyA3wfl35CzCuXjk1wCkz64hZawNYyWjHDg";

  return new Promise((resolve, reject) => {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=YOUR_PLACE_ID`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getgooglemap;
