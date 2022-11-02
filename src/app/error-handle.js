const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_ALREADY_EXIST,
} = require("../constants/error-type");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      status = 200;
      message = NAME_OR_PASSWORD_IS_REQUIRED;
      break;
    case NAME_ALREADY_EXIST:
      status = 406;
      message = NAME_ALREADY_EXIST;
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
