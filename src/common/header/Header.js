import React from "react";
import { Fragment } from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Modal from "react-modal";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import useLoginForm from "../login/useLoginForm";
import useRegisterForm from "../register/useRegisterForm";
import ValidateLogin from "../login/ValidateLogin";
import ValidateRegister from "../register/ValidateRegister";
import { FormHelperText } from "@material-ui/core";
import { useHistory } from "react-router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 10,
  },
};

Modal.setAppElement(document.getElementById("root"));

export default function Header(props) {
  const { submitLoginForm, submitRegisterForm } = props;
  let { isLoggedin } = props;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  isLoggedin = false;
  let accessKey;

  const history = useHistory();

  const { validateLoginForm, loginvalues, loginSubmit, loginerrors } =
    useLoginForm(submitLoginForm, ValidateLogin);

  const {
    validateRegisterForm,
    registervalues,
    registerSubmit,
    registererrors,
  } = useRegisterForm(submitRegisterForm, ValidateRegister);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function openBookShow() {
    history.push("/bookshow");
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  let loginbutton;

  let bookshowbutton;

  let loginmodal = (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Paper style={{ borderRadius: 5, padding: 10 }}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <br />
        <br />

        <TabPanel value={value} index={0}>
          <div className="tab-format">
            <form onSubmit={loginSubmit}>
              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  value={loginvalues.username}
                  onChange={validateLoginForm}
                  type="text"
                />
                {loginerrors.username && (
                  <FormHelperText error>{loginerrors.username}</FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <Input
                  id="loginPassword"
                  name="loginPassword"
                  type="password"
                  value={loginvalues.loginPassword}
                  onChange={validateLoginForm}
                />

                {loginerrors.password && (
                  <FormHelperText error>{loginerrors.password}</FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                name="login"
              >
                Login
              </Button>
              <br />
              <br />
            </form>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="tab-format">
            <form onSubmit={registerSubmit}>
              <FormControl required>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={registervalues.firstname}
                  onChange={validateRegisterForm}
                  required
                />
                {registererrors.firstname && (
                  <FormHelperText error>
                    {registererrors.firstname}
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={registervalues.lastname}
                  onChange={validateRegisterForm}
                  required
                />
                {registererrors.lastname && (
                  <FormHelperText error>
                    {registererrors.lastname}
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={registervalues.email}
                  onChange={validateRegisterForm}
                  required
                />
                {registererrors.email && (
                  <FormHelperText error>{registererrors.email}</FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  name="registerPassword"
                  type="password"
                  value={registervalues.registerPassword}
                  onChange={validateRegisterForm}
                  required
                />
                {registererrors.password && (
                  <FormHelperText error>
                    {registererrors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="contactno">Contact No.</InputLabel>
                <Input
                  id="contactno"
                  name="contactno"
                  value={registervalues.contactno}
                  onChange={validateRegisterForm}
                  required
                />
                {registererrors.contactno && (
                  <FormHelperText error>
                    {registererrors.contactno}
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <br />

              <Button variant="contained" color="primary" name="Register">
                Register
              </Button>
              <br />
              <br />
            </form>
          </div>
        </TabPanel>
      </Paper>
    </Modal>
  );
  if (isLoggedin) {
    accessKey = "Logout";
    loginbutton = (
      <Button variant="contained" color="default" className="log-right">
        {accessKey}
      </Button>
    );
    bookshowbutton = (
      <Button
        type="button"
        variant="contained"
        color="primary"
        style={{ marginRight: 16, float: "right" }}
        onClick={openBookShow}
      >
        Book Show
      </Button>
    );
  } else {
    accessKey = "Login";
    loginbutton = (
      <Fragment>
        <Button
          variant="contained"
          color="default"
          className="log-right"
          onClick={openModal}
        >
          {accessKey}
        </Button>
      </Fragment>
    );
    bookshowbutton = (
      <Fragment>
        <Button
          type="button"
          variant="contained"
          color="primary"
          style={{ marginRight: 16, float: "right" }}
          onClick={openModal}
        >
          Book Show
        </Button>
        {loginmodal}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="header">
        <img src={logo} className="logo" alt="logo" id="logo" />

        {loginbutton}
        {bookshowbutton}
      </div>
    </Fragment>
  );
}
