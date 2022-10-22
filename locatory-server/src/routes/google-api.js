const axios = require("axios");
const router = require("express").Router();

const apiKey = process.env.GMAP_TOKEN;

const geocodeEndpoint = "https://maps.googleapis.com/maps/api/geocode/json";
const autocompleteEndpoint = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const placeDetailsEndpoint = "https://maps.googleapis.com/maps/api/place/details/json";
const photoEndpoint = "https://maps.googleapis.com/maps/api/place/photo";
const nearbyEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

router.post("/get-city-by-coords", async (req, res) => {
  try {
    const {latlng} = req.body;
    const apiUrl = `${geocodeEndpoint}?latlng=${latlng}&sensor=false&key=${apiKey}`;
    const {data} = await axios.get(apiUrl);
    const content = data.plus_code.compound_code.split(" ");
    const city = content[1].slice(0, -1);
    const country = content.slice(-1)[0];
    return res.status(200).json(`${city}, ${country}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/autocomplete", async (req, res) => {
  try {
    const {input, location} = req.body;
    const apiUrl = `${autocompleteEndpoint}?input=${input}&key=${apiKey}&location=${location}&radius=14000&rankby=distance`;
    const {data} = await axios.get(apiUrl);
    const results = data.predictions;
    
    const toSend = [];
    for (let result of results) {
      toSend.push({
        main_text: result.structured_formatting.main_text,
        secondary_text: result.structured_formatting.secondary_text,
        place_id: result.place_id
      });
    }

    return res.status(200).json(toSend);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/place-info", async (req, res) => {
  try {
    const {place_id} = req.body;
    const apiUrl = `${placeDetailsEndpoint}?key=${apiKey}&place_id=${place_id}`;
    const data = (await axios.get(apiUrl)).data.result;
    const location = data.geometry.location;
    const result = {
      photo_url: `${photoEndpoint}?photo_reference=${data.photos[0].photo_reference}&key=${apiKey}&maxwidth=400`,
      name: data.name,
      location: `${location.lat},${location.lng}`,
      rating: data.rating,
      total_ratings: data.user_ratings_total,
      isFavourite: false,
      open_now: data?.opening_hours?.open_now || true,
      address: data.formatted_address,
      reviews: data.reviews.map(({ 
        author_name, profile_photo_url, rating, relative_time_description, text 
      }) => ({ author_name, profile_photo_url, rating, relative_time_description, text })),
      phone: data.formatted_phone_number,
      website: data.website,
    };
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/nearby-search", async (req, res) => {
  try {
    const {location, page} = req.body;
    let apiUrl = `${nearbyEndpoint}?key=${apiKey}&rankby=distance&location=${location}`;
    if (page && page.length > 1)
      apiUrl += `&pagetoken=${page}`;
    const {next_page_token, results} = (await axios.get(apiUrl)).data;
    const items = [];
    for (let result of results) {
      const loc = result.geometry.location;
      const item = {
        name: result.name,
        location: `${loc.lat},${loc.lng}`,
        rating: result?.rating,
        total_ratings: result?.user_ratings_total,
        isFavourite: false,
        open_now: result?.opening_hours?.open_now||false,
        address: result?.vicinity||"",
        place_id: result?.place_id||"",
        photo_url: ""
      };
      if (result.photos) 
        item.photo_url = `${photoEndpoint}?photo_reference=${result.photos[0].photo_reference}&key=${apiKey}&maxwidth=400`,
      items.push(item);
    }
    return res.status(200).json({token: next_page_token || null, items});
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/nearby-place-misc", async (req, res) => {
  try {
    const {place_id} = req.body;
    const apiUrl = `${placeDetailsEndpoint}?key=${apiKey}&place_id=${place_id}&fields=reviews,formatted_phone_number,website`;
    const data = (await axios.get(apiUrl)).data.result;
    const result = {
      reviews: data?.reviews?.map(({
        author_name, profile_photo_url, rating, relative_time_description, text
      }) => ({ author_name, profile_photo_url, rating, relative_time_description, text })) || [],
      phone: data?.formatted_phone_number||"",
      website: data?.website||"",
    };
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
