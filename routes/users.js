const { Router } = require("express");
const userController = require("../controllers/userController");
const { destroyToken } = require("../middleware/authMiddleware");

const router = Router();

router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup_post);
router.get("/signin", destroyToken, userController.signin_get);
router.post("/signin", userController.signin_post);
router.get("/signout", destroyToken, userController.signout);

module.exports = router;
