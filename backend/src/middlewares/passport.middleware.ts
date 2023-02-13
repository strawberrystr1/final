import passport from "passport";
import bcrypt from "bcrypt";
import JWTStrategy, { StrategyOptions } from "passport-jwt";

import { USER_NOT_EXISTS, WRONG_PASSWORD } from "../constants/httpMessages";
import { getUser } from "../services/user.service";

const { Strategy, ExtractJwt } = JWTStrategy;

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SERET
};

passport.use(
  new Strategy(options, async (payload, done) => {
    const user = await getUser(payload.email);

    if (!user) {
      return done({ msg: USER_NOT_EXISTS }, false);
    }

    return done(null, user);
  })
);
