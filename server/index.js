const express = require('express');
require('./db/mongoose');
require('dotenv').config();
const cors = require('cors');
const charityPartnerRoute = require('./routes/charityPartnerRoute');
const fundraiserRoute = require('./routes/fundraiserRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(charityPartnerRoute);
app.use(fundraiserRoute);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
