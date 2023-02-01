import passport from "passport";
import JWTStrategy, { StrategyOptions } from "passport-jwt";
import { getUser } from "../services/user.service";

const { Strategy, ExtractJwt } = JWTStrategy;

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SERET
};

passport.use(
  new Strategy(options, async (payload, done) => {
    console.log("payload: ", payload);
    const user = await getUser(payload.name, payload.email);

    // if (!user) {
    //   return done({ msg: "User " });
    // }
    return done(null, user);
  })
);
