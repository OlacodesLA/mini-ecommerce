import React, { useState, useEffect } from "react";
import TextField from "../inputs/text";
import { useFormik } from "formik";
import { customerSchema } from "@/schemas";
import { DefaultButton } from "../button";
import PreviousButton from "../button/prevButton";

type Props = {
  onNextStep: () => void;
  onPrevStep: () => void;
};

const PaymentInfo = ({ onNextStep, onPrevStep }: Props) => {
  const [isFormValid, setFormValid] = useState(false);

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("customerFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setValues(parsedData);
    }
  }, []);

  const {
    handleChange,
    errors,
    touched,
    values,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: customerSchema,
    onSubmit: (values) => {
      if (isFormValid) {
        // Save form data to localStorage
        localStorage.setItem("customerFormData", JSON.stringify(values));
        onNextStep(); // Call the function to navigate to the next step
      }
    },
    validate: (values) => {
      const isValid = Object.keys(errors).length === 0;
      setFormValid(isValid);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
      <TextField
        type="text"
        placeholder="First Name"
        name="firstName"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.firstName}
        error={errors.firstName}
        touched={touched.firstName}
      />
      <TextField
        type="text"
        placeholder="Last Name"
        name="lastName"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.lastName}
        error={errors.lastName}
        touched={touched.lastName}
      />
      <TextField
        type="email"
        placeholder="Email"
        name="email"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.email}
        error={errors.email}
        touched={touched.email}
      />
      <TextField
        type="text"
        placeholder="Phone"
        name="phone"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.phone}
        error={errors.phone}
        touched={touched.phone}
      />

      <div className="flex justify-end">
        <PreviousButton
          type="submit"
          click={() => onPrevStep()}
          label="Previous"
        />
        <DefaultButton type="submit" label="Finish" />
      </div>
    </form>
  );
};

export default PaymentInfo;
