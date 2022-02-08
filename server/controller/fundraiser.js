const Fundraiser = require('../models/FundRaiser');

const createFundraiser = async (req, res) => {
  // const user = new Fundraiser(req.body);
  const fundraiser = new Fundraiser({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await fundraiser.save();
    res.status(201).send(fundraiser);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
const listFundraisers = async (req, res) => {
  try {
    await req.user.populate('fundRaisers');
    res.send(req.user.fundRaisers);
  } catch (e) {
    res.status(500).send();
  }
};
const findOneFundraiser = async (req, res) => {
  const _id = req.params.id;
  try {
    const fundraiser = await Fundraiser.findOne({ _id, owner: req.user._id });
    if (!fundraiser) {
      return res.status(404).send();
    }
    res.send(fundraiser);
  } catch (e) {
    res.status(500).send();
  }
};
const updateFundraiser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'startDate',
    'endDate',
    'receivedAmt',
    'requiredAmt',
    'status',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  try {
    const fundraiser = await Fundraiser.findOne({ _id: req.params.id });
    if (!fundraiser) {
      return res.status(404).send();
    }
    updates.forEach((update) => (fundraiser[update] = req.body[update]));
    await fundraiser.save();
    res.send(fundraiser);
  } catch (e) {
    res.status(400).send(e);
  }
};
const deleteFundraiser = async (req, res) => {
  try {
    //findByIdAndDelete
    const fundraiser = await Fundraiser.findOneAndDelete({
      _id: req.params.id,
    });
    if (!fundraiser) {
      return res.status(404).send();
    }
    res.send(fundraiser);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  createFundraiser,
  listFundraisers,
  findOneFundraiser,
  updateFundraiser,
  deleteFundraiser,
};
