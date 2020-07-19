function validatePassword(password, hash) {
  return password.length > 3;
}
exports.validatePassword = validatePassword;
