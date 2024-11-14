// define parameters data type
/**
 * @param {Object} body contain validation details.
 * @param {String} provide to check vaildation type
 */
// function to validate
function simpleValidater(body, provide) {
  //
  if (typeof body !== "object" || typeof provide !== "string")
    throw new TypeError("Invalid type of body or provide");
  // regex for email and other field vaildation
  const regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
  const regex = /.+/g;
  // get all field from body by using object destructing
  const { username, email, password, confirmPassword, textarea } = body;
  // if password equals to confirmPassword then this will true else false
  const checkPass = password === confirmPassword;
  // switch to check multiple statement
  switch (true) {
    // if provide equals checkPass and confirmPassword(variable) is null or undefined then this will fire
    case provide === "checkPass" && !confirmPassword:
      return false;
    // if provide equals checkPass and checkPass(variable) is null or undefined then this will fire
    case provide === "checkPass" && !checkPass:
      return false;
    // if provide equals password and password(variable) is null or undefined then this will fire
    case provide === "password" && !password:
      return false;
    // if provide equals username and username(variable) is null or undefined then this will fire
    case provide === "username" && !username:
      return false;
    // if provide equals textarea and textarea(variable) is null or undefined then this will fire
    case provide === "textarea" && !textarea:
      return false;
    // if all above is not match then this will fire
    default:
      // if email, password, username and textarea pass regex test then this will fire
      if (
        regex.test(username && password && textarea) &&
        regexForEmail.test(email)
      )
        return true;
      // else this will fire
      else return false;
  }
}
// export function to use as a middleware
module.exports = simpleValidater;
