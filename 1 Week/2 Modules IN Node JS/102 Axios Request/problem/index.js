const { default: axios } = require("axios");

// Please do not change the prewritten code
const Solution = async () => {
  try {
    const res = await axios.get(`https://api.codingninjas.com/api/v3/event_tags`);
    console.log(res);

  } catch (error) {
    console.log('Error getting occured: ' + error.message);
  }

};
Solution();
module.exports = Solution;
