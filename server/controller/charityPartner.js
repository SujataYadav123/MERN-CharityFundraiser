const CharityPartner = require('../models/CharityPartner');

//register
const userRegister = async (req, res) => {
  try {
    const user = new CharityPartner(req.body);
    console.log(user);
    const token = await user.generateAuthToken();
    // await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
//login
const userLogin = async (req, res) => {
  try {
    const user = await CharityPartner.findByCredentials(
      req.body.emailID,
      req.body.password
    );
    console.log('Logged In');
    const token = await user.generateAuthToken();
    res.send({ user, token }); //shorthand syntax to send an object with two properties
  } catch (e) {
    res.status(400).send();
  }
};
//logout
const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log('Logged Out');
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
//user profile
const userProfile = async (req, res) => {
  res.send(req.user);
};
//update user Password
const updatePassword = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['password'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send('Invalid updates');
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  userProfile,
  updatePassword,
};
