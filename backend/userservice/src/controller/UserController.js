const express = require("express")
const router = express.Router();
const userService = require("../service/UserService")
var bodyParser = require('body-parser')
// parse application/json
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
// Get All 
router.get("/", userService.getAllUser);
// Get User Information
router.get("/id/:userid", userService.getUserByUserId);
// Post New User
router.post("/newuser", userService.postNewUser);

router.post("/login", userService.login);

module.exports = router;