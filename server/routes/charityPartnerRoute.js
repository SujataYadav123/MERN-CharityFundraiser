const express = require('express');
const auth = require('../middlewares/auth');
const router = new express.Router();

const {
  userRegister,
  userLogin,
  userLogout,
  userProfile,
  updatePassword,
} = require('../controller/charityPartner');

router.post('/users/register', userRegister);
router.post('/users/login', userLogin);
router.post('/users/logout', auth, userLogout);
router.get('/users/profile', auth, userProfile);
router.patch('/users/password', auth, updatePassword);

module.exports = router;
