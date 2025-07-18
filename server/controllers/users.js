const bcrypt = require("bcryptjs");
const { jwtVerify } = require("jose");
const { SignToken } = require("../middlewares/auth.js");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const IncorrectEmailError = require("../errors/IncorrectEmailError");
const UnauthorizatedError = require("../errors/UnauthorizatedError");

const { NODE_ENV, JWT_SECRET } = process.env;

const key = new TextEncoder().encode(
  NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret"
);

const User = require("../models/user");

const getUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new UnauthorizatedError("Необходима авторизация"));
  }

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    const user = await User.findById(payload._id).orFail(() => {
      throw new NotFoundError("Пользователь не найден");
    });

    return res.send({
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
    });
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Пользователь не найден"));
    }
    return next(err);
  }
};

const getSearchUser = (req, res, next) => {
  const { name } = req.body;
  User.findOne({ name })
    .orFail(() => new NotFoundError("Пользователь не найден"))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Пользователь не найден"));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email, phone, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      phone,
      avatar,
    },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Пользователь не найден"))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Переданы некорректные данные"));
      }
      if (err.code === 11000) {
        return next(
          new IncorrectEmailError("Пользователь с таким email уже существует")
        );
      }
      return next(err);
    });
};

const updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Пользователь не найден"))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Переданы некорректные данные"));
      }
      if (err.code === 11000) {
        return next(
          new IncorrectEmailError("Пользователь с таким email уже существует")
        );
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, phone, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        phone,
        email,
        password: hash,
      })
    )
    .then((user) => {
      SignToken({ _id: user._id })
        .then((token) => {
          res.cookie("token", token, {
            httpOnly: true, // Недоступна через JavaScript
            secure: true, // Только HTTPS (если не в dev-режиме)
            sameSite: "strict", // Защита от CSRF
            maxAge: 24 * 60 * 60 * 1000, // Срок жизни (1 день)
          });
          res.status(201).send({ token });
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new IncorrectEmailError("Пользователь с таким email уже существует")
        );
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Переданы некорректные данные"));
      }
      return next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      SignToken({ _id: user._id })
        .then((token) => {
          res.cookie("token", token, {
            httpOnly: true, // Недоступна через JavaScript
            secure: true, // Только HTTPS (если не в dev-режиме)
            sameSite: "strict", // Защита от CSRF
            maxAge: 24 * 60 * 60 * 1000, // Срок жизни (1 день)
          });
          res.send({
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatar: user.avatar,
            token,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch(() => {
      next(new UnauthorizatedError("Неправильный логин или пароль"));
    });
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true, // Для HTTPS
      sameSite: "strict", // Защита от CSRF
    })
    .status(200)
    .send({ message: "Вы успешно вышли из аккаунта" })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  loginUser,
  getSearchUser,
  updateAvatarUser,
  logoutUser,
};
