const express = require("express");
const {
  getUserItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../../controllers/itemController");
const validateToken = require("../../utils/validateToken");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getUserItems).post(addItem);
router.route("/:id").put(updateItem).delete(deleteItem);

module.exports = router;
