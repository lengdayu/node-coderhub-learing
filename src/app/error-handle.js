const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_ALREADY_EXIST,
  USER_DOES_NOT_EXITS,
  PASSWORD_IS_INCORRENT,
  UN_AUTHORIZATION,
} = require("../constants/error-type");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      status = 200;
      message = NAME_OR_PASSWORD_IS_REQUIRED;
      break;
    case NAME_ALREADY_EXIST:
      status = 409;
      message = NAME_ALREADY_EXIST;
      break;
    case USER_DOES_NOT_EXITS:
      status = 400;
      message = USER_DOES_NOT_EXITS;
      break;
    case PASSWORD_IS_INCORRENT:
      status = 400;
      message = PASSWORD_IS_INCORRENT;
      break;
    case UN_AUTHORIZATION:
      status = 401;
      message = UN_AUTHORIZATION;
      break;

    default:
      status = 404;
      message = "NOT FOUND";
      break;
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
