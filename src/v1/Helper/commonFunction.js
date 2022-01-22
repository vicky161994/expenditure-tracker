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
