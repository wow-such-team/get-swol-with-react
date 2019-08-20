const router = require("express").Router();
const controller = require("../../controller/controller");

router.route("/")
    .post(controller.newUser);

router.route("/:username")
    .get(controller.searchUser)

module.exports = router;