const jwt = require("jsonwebtoken");

const client = require("./astra-db");

const whitelist = [
  "/api/users/login",
  "/api/google-api/get-city-by-coords"
];

const isUserLoggedIn = async phoneNo => {
  const { rowLength } = await client.execute(
    `SELECT phone_no FROM tokens WHERE phone_no = ?`, 
    [phoneNo],
    {prepare: true}
  );
  return rowLength > 0;
};

const loginUser = async (phoneNo, token) => {
  const QUERY = `INSERT INTO tokens (phone_no, tkn) VALUES (?, ?)`;
  const VALUES = [phoneNo, token];
  await client.execute(QUERY, VALUES);
};

const removeUser = async phoneNo => {
  try {
    if (!phoneNo || !phoneNo.length) return;
    const QUERY = `DELETE FROM tokens WHERE phone_no = ?`;
    const VALUES = [phoneNo];
    await client.execute(QUERY, VALUES);
  } catch (err) {
    console.log(err);
  }
};

const generateAccessToken = async phoneNo => {
  if (await isUserLoggedIn(phoneNo)) return null;

  const token = jwt.sign({ id: phoneNo }, process.env.JWT_SECRET);
  await loginUser(phoneNo, token);
  return token;
};

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (whitelist.includes(req.path))
    return next();

  if (!authHeader)
    return res.status(400).json("You are NOT Authenticated");

  const token = authHeader.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const QUERY = `SELECT tkn FROM tokens WHERE phone_no = ?`;
    const VALUES = [id];
    const { rows, rowLength } = await client.execute(QUERY, VALUES);
    if (!isUserLoggedIn(id) || !rowLength || rows[0].tkn != token)
      throw new Error("Not valid");
    req.phoneNo = id;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json("You are NOT Authorized");
  }
};

module.exports = {
  isUserLoggedIn,
  loginUser,
  removeUser,
  generateAccessToken,
  verifyUser
};