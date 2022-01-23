const JWT = require("jsonwebtoken");
module.exports = generateToken = (user) => {
  return JWT.sign(
    {
      _id: user._id,
      name: user.fullName,
      email: user.email,
      number: user.number,
    },
    process.env.JWT_SECRET || "itssupersecret",
    {
      expiresIn: "7d",
    }
  );
};

module.exports = trimInputData = (payload) => {
  let keys = Object.keys(payload);
  for (let i = 0; i < keys.length; i++) {
    if (payload[keys[i]]) {
      payload[keys[i]] = payload[keys[i]].trim();
    }
  }
  return payload;
};

module.exports = { generateToken, trimInputData };
