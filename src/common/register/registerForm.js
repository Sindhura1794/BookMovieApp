import React, { useState } from "react";

import Header from "../header/Header";

const registerForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitRegisterForm() {
    setIsSubmitted(true);
  }
  turn(
    <>
      <div>
        {!isSubmitted ? (
          <Header submitRegisterForm={submitRegisterForm} />
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default registerForm;
