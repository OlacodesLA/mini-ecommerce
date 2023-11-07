import React, { useState, useEffect, useContext } from "react";
import TextField from "../inputs/text";
import TextArea from "../inputs/textarea";
import { useFormik } from "formik";
import { shippingSchema } from "@/schemas";
import { DefaultButton } from "../button";
import PreviousButton from "../button/prevButton";
import { CartContext } from "@/context/stateContext";

type Props = {
  onNextStep: () => void;
  onPrevStep: () => void;
};

const ShippingInfo = ({ onNextStep, onPrevStep }: Props) => {
  const [isFormValid, setFormValid] = useState(false);

  const { cart } = useContext(CartContext)!;
  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("shippingFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      formik.setValues(parsedData);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      info: "",
      country: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      if (isFormValid) {
        // Save form data to localStorage
        localStorage.setItem("shippingFormData", JSON.stringify(values));
        onNextStep(); // Call the function to navigate to the next step
      }
    },
    validate: (values) => {
      const isValid = Object.keys(formik.errors).length === 0;
      setFormValid(isValid);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-5">
      <TextField
        type="text"
        placeholder="Delivery Address"
        name="address"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.address}
        error={formik.errors.address}
        touched={formik.touched.address}
      />
      <TextField
        type="text"
        placeholder="City"
        name="city"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.city}
        error={formik.errors.city}
        touched={formik.touched.city}
      />
      <TextField
        type="text"
        placeholder="Country"
        name="country"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.country}
        error={formik.errors.country}
        touched={formik.touched.country}
      />
      <TextArea
        type="text"
        placeholder="Additional Information"
        name="info"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.info}
        error={formik.errors.info}
        touched={formik.touched.info}
      />

      <div className="flex justify-end">
        <PreviousButton
          type="submit"
          click={() => onPrevStep()}
          label="Previous"
        />
        <DefaultButton type="submit" label="Next" />
      </div>
    </form>
  );
};

export default ShippingInfo;
