export default function ValidateLogin(values) {
  let loginerrors = {};

  if (!values.username.trim()) {
    loginerrors.username = "Username required";
  }

  if (!values.loginPassword) {
    loginerrors.loginPassword = "Password is required";
  } else if (values.loginPassword.length < 6) {
    loginerrors.password = "Password needs to be 6 characters or more";
  }

  if (!values.firstname) {
    loginerrors.firstname = "Firstname required";
  }

  if (!values.lastname) {
    loginerrors.lastname = "Lastname required";
  }

  if (!values.email) {
    loginerrors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    loginerrors.email = "Email address is invalid";
  }

  if (!values.registerPassword) {
    loginerrors.registerPassword = "Password is required";
  } else if (values.registerPassword.length < 6) {
    loginerrors.password = "Password needs to be 6 characters or more";
  }

  return loginerrors;
}
