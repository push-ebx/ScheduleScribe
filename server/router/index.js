const express = require("express");
const authMiddleware = require('../middlewares/auth-middleware');
const AuthController = require("../controllers/auth-controller");
const UserController = require("../controllers/user-controller");
const ProjectController = require("../controllers/project-controller");
const NoteboardController = require("../controllers/noteboard-controller");
const NoteController = require("../controllers/note-сontroller");
const CalendarController = require("../controllers/calendar-сontroller");
const EventController = require("../controllers/event-сontroller");

const router = express.Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/registration", AuthController.registration);
router.get("/user/get", authMiddleware, UserController.getUser);

router.post("/project/create", authMiddleware, ProjectController.createProject);
router.post("/project/add", authMiddleware, ProjectController.addProject);
router.get("/projects/get", authMiddleware, ProjectController.getProjects);
router.get("/project/get", authMiddleware, ProjectController.getProject);
router.delete("/project/delete", authMiddleware, ProjectController.deleteProject);

router.post("/noteboard/create", authMiddleware, NoteboardController.createNoteboard);
router.get("/noteboards/get", authMiddleware, NoteboardController.getNoteboards);
router.get("/noteboard/get", authMiddleware, NoteboardController.getNoteboard);
router.delete("/noteboard/delete", authMiddleware, NoteboardController.deleteNoteboard);

router.post("/note/create", authMiddleware, NoteController.createNote);
router.get("/notes/get", authMiddleware, NoteController.getNotes);
router.get("/note/get", authMiddleware, NoteController.getNote);
router.delete("/note/delete", authMiddleware, NoteController.deleteNote);

router.post("/calendar/create", authMiddleware, CalendarController.createCalendar);
router.get("/calendars/get", authMiddleware, CalendarController.getCalendars);
router.get("/calendar/get", authMiddleware, CalendarController.getCalendar);
router.delete("/calendar/delete", authMiddleware, CalendarController.deleteCalendar);

router.post("/event/create", authMiddleware, EventController.createEvent);
router.get("/events/get", authMiddleware, EventController.getEvents);
router.get("/event/get", authMiddleware, EventController.getEvent);
router.delete("/event/delete", authMiddleware, EventController.deleteEvent);

router.get("/", (req, res) => res.send({ status: "ok" }));

module.exports = router;