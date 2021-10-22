const { Router } = require("express");
const adminController = require("../controllers/adminController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = Router();

router.get("/admin", requireAuth, adminController.admin_get);
router.post("/deleteBook", requireAuth, adminController.delete_post);
router.get("/addBook", requireAuth, adminController.addBook_get);
router.post("/addBook", requireAuth, adminController.addBook_post);

module.exports = router;
