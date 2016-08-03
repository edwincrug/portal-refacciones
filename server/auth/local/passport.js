import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, rfc, password, done) {
  User.find({
    where: {
      rfc: rfc.toLowerCase()
    }
  })
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'This rfc is not registered.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

export function setup(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'rfc',
    passwordField: 'password' // this is the virtual field on the model
  }, function(rfc, password, done) {
    return localAuthenticate(User, rfc, password, done);
  }));
}
