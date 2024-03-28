const express = require("express");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", (req, res) => res.send({ status: "ok" }));

module.exports = router;