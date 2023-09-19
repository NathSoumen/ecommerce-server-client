const fetch = require("node-fetch");

async function getCountryList(req, res) {
  fetch("https://restcountries.com/v3/all")
    .then((res) => res.json())
    .then((json) => {
      return res.status(200).json({ succss: true, data: json });
    });
}
module.exports = {
  getCountryList: getCountryList,
};
