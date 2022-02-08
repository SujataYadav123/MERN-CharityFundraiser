const express = require('express');
const auth = require('../middlewares/auth');
const router = new express.Router();

const {
  createFundraiser,
  listFundraisers,
  findOneFundraiser,
  updateFundraiser,
  deleteFundraiser,
} = require('../controller/fundraiser');

router.post('/fundraisers/create', auth, createFundraiser);
router.get('/fundraisers', auth, listFundraisers);
router.get('/fundraisers/:id', auth, findOneFundraiser);
router.patch('/fundraisers/:id', auth, updateFundraiser);
router.delete('/fundraisers/:id', auth, deleteFundraiser);

module.exports = router;
