const fs = require('fs');
const path = require('path');
const CharityPartner = require('mongoose').model('CharityPartner');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pathToKey = path.join(_dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithm: ['RS256'],
};
const strategy = new JwtStrategy(options, (payload, done) => {
  CharityPartner.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        retur;
        done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use(strategy);
};
