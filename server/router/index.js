const express = require("express");
const AuthController = require("../controllers/auth-controller");
const ProjectController = require("../controllers/project-controller");
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/registration", AuthController.registration);

router.post("/project/create", authMiddleware, ProjectController.createProject);
router.post("/project/add", authMiddleware, ProjectController.addProject);
router.post("/projects/get", authMiddleware, ProjectController.getProjects);
router.get("/project/get", authMiddleware, ProjectController.getProject);
router.delete("/project/delete", authMiddleware, ProjectController.deleteProject);
router.get("/", (req, res) => res.send({ status: "ok" }));

module.exports = router;