const router = require("express").Router();
const controller = require("../../controller/controller");

router.route("/")
    .post(controller.newUser);

module.exports = router;