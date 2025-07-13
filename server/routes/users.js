const router = require("express").Router();
const {
  getUser,
  updateUser,
  getSearchUser,
  updateAvatarUser,
  logoutUser,
} = require("../controllers/users");

const {
  validationUpdateUser,
  validationSearchUser,
  validationUpdateUserAvatar,
} = require("../middlewares/validators");

router.get("/user", getUser);
router.get("/user-search", validationSearchUser, getSearchUser);
router.patch("/user", validationUpdateUser, updateUser);
router.patch("/user-avatar", validationUpdateUserAvatar, updateAvatarUser);
router.post("/logout", logoutUser);

module.exports = router;
