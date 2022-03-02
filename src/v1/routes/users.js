const express = require("express");
const router = express.Router();
const { UserService } = require("../services");

router.post("/login", UserService.login);
router.post("/register", UserService.register);
router.get("/get-user-list", UserService.getUserList);

module.exports = router;
