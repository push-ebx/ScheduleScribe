const express = require("express");
const UserController = require("../controllers/user-controller");
const AuthController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/registration", AuthController.registration);
router.get("/", (req, res) => res.send({ status: "ok" }));

module.exports = router;