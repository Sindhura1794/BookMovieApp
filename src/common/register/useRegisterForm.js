import { useState, useEffect } from "react";

const useRegisterForm = (callback, validate) => {
  const [registervalues, setRegistervalues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    registerPassword: "",
    contactno: "",
  });

  const [registererrors, setRegistererrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRegisterForm = (e) => {
    const { name, value } = e.target;
    setRegistervalues({
      ...registervalues,
      [name]: value,
    });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    setRegistererrors(validate(registervalues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(registererrors).length === 0 && isSubmitting) {
      callback();
    }
  }, [registererrors]);

  return {
    validateRegisterForm,
    registerSubmit,
    registervalues,
    registererrors,
  };
};

export default useRegisterForm;
