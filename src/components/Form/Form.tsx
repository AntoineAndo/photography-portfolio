import React, { useState } from "react";
import "./Form.scss";
import emailjs from "@emailjs/browser";

type Props = {};

function Form({}: Props) {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessFrame, setShowSuccessFrame] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submitMail = () => {
    const err = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    if (typeof name !== "string" || name.length == 0) {
      err.name += "Please enter a name. ";
    }
    if (typeof email !== "string" || email.length == 0) {
      err.email += "Email is not valid. ";
    }
    if (typeof subject !== "string" || email.length == 0) {
      err.subject += "Please enter a subject. ";
    }
    if (typeof message !== "string" || message.length == 0) {
      err.message += "Please enter a message. ";
    }

    setErrors(err);

    const hasErrors = Object.values(err).some((msg) => msg);
    if (!hasErrors) {
      const form = {
        name,
        email,
        subject,
        message,
      };

      setIsLoading(true);

      emailjs
        .send(
          import.meta.env?.PUBLIC_MAILJS_SERVICE_ID,
          import.meta.env?.PUBLIC_MAILJS_TEMPLATE_ID,
          form,
          import.meta.env?.PUBLIC_MAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            setIsLoading(false);
            setShowSuccessFrame(true);
          },
          (error) => {
            console.error(error);
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <div className="form">
      <div className="input">
        <label> Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div className="input">
        <label> Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className="input">
        <label> Subject:</label>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        {errors.subject && <p>{errors.subject}</p>}
      </div>
      <div className="input">
        <label> Message:</label>
        <textarea
          name="message"
          placeholder="Message"
          required
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        {errors.message && <p>{errors.message}</p>}
      </div>
      <button onClick={() => submitMail()}>Send</button>
      {isLoading && <div className={"formOverlay"}></div>}
      {showSuccessFrame && (
        <div className="successFrame">
          <p>Your email was successfuly sent</p>
          <p>I'll get back to you shortly</p>
        </div>
      )}
    </div>
  );
}

export default Form;
