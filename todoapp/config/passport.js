const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = function (app) {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
    },function(username, password, done) {
    }
    ));
}