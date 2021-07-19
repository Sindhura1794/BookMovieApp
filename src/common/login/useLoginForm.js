import { useState, useEffect } from "react";

const useLoginForm = (callback, validate) => {
  const [loginvalues, setLoginvalues] = useState({
    username: "",
    loginPassword: "",
  });

  const [loginerrors, setLoginerrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginvalues({
      ...loginvalues,
      [name]: value,
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    setLoginerrors(validate(loginvalues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(loginerrors).length === 0 && isSubmitting) {
      callback();
    }
  }, [loginerrors]);

  return { validateLoginForm, loginSubmit, loginvalues, loginerrors };
};

export default useLoginForm;
