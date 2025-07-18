const { SignJWT, jwtVerify } = require("jose");

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizatedError = require("../errors/UnauthorizatedError");

const key = new TextEncoder().encode(
  NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
);

const auth = async (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith("Bearer ")) {
  //   return next(new UnauthorizedError("Необходима авторизация"));
  // }

  // const token = authorization.replace("Bearer ", "");

  const { token } = req.cookies;

  if (!token) {
    return next(new UnauthorizatedError("Необходима авторизация"));
  }

  try {
    const { payload } = await jwtVerify(token, key);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizatedError("Необходима авторизация"));
  }
};

async function SignToken(payload) {
  const validPayload = {
    _id: payload._id.toString(),
  };

  const token = await new SignJWT(validPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  if (!token) throw new Error("Ошибка при создании токена");

  return token;
}

module.exports = { auth, SignToken };
