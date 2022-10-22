const router = require("express").Router();

const client = require("../utils/astra-db");
const {isUserLoggedIn, generateAccessToken, removeUser} = require("../utils/jwt");

router.post("/login", async (req, res) => {
  try {
    const {phoneNo} = req.body;
    if (await isUserLoggedIn(phoneNo))
      return res.status(400).json("Already logged in");
      let query = `
      SELECT favourites FROM users
      WHERE phone_no = ?;
      `;
      let value = [phoneNo];
    const {rows} = await client.execute(query, value, {prepare: true});
    if (rows.length > 0) {
      return res.status(200).json({favourites: rows[0].favourites || [], token: await generateAccessToken(phoneNo)});
    } else {
      query = `
        INSERT into users (phone_no) 
        VALUES (?);
      `;
      value = [phoneNo];
      await client.execute(query, value, {prepare: true});
      return res.status(200).json({ favourites: [], token: await generateAccessToken(phoneNo) });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/logout", async (req, res) => {
  try {
    const {phoneNo} = req;
    const isLogged = await isUserLoggedIn(phoneNo);
    if (!isLogged)
      return res.status(400).json("Not logged in");
    await removeUser(phoneNo);
    return res.status(200).json("Logged out successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/add-favourite/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const query = `
      UPDATE users SET favourites = favourites + ?
      WHERE phone_no = ?;
    `;
    const value = [[id], req.phoneNo];
    await client.execute(query, value, {prepare: true});
    return res.status(200).json("Added to favourites");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/remove-favourite/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      UPDATE users SET favourites = favourites - ?
      WHERE phone_no = ?;
    `;
    const value = [[id], req.phoneNo];
    await client.execute(query, value, { prepare: true });
    return res.status(200).json("Removed from favourites");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/favourites", async (req, res) => {
  try {
    const {phoneNo} = req;
    const query = `
      SELECT favourites FROM users
      WHERE phone_no = ?;
    `;
    const value = [phoneNo];
    const {rows} = await client.execute(query, value);
    return res.status(200).json({favourites: rows[0].favourites || []});
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
