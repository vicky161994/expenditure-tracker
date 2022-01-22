const express = require("express");
const router = express.Router();
const { UserService } = require("../services");

router.post("/login", UserService.login);

module.exports = router;
