import * as yup from "yup";

const numberRule = /^(?=.*\d)/;
const lowerCaseRule = /^(?=.*[a-z])/;
const upperCaseRule = /^(?=.*[A-Z])/;
const specialRule = /^(?=.*[A-Z])/;
const username = /^[a-zA-Z0-9_]+$/;
const nospace = /^\S+$/;

export const customerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email cannot be empty"),
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  phone: yup.string().required("Phone Number is required."),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email cannot be empty"),

  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  phone: yup
    .string()
    // .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required."),
  otp: yup.string(),
});

export const shippingSchema = yup.object().shape({
  address: yup.string().required("Address is required."),
  info: yup.string().required("Address is required."),
  city: yup.string().required("City is required."),

  country: yup.string().required("Country is required."),
});
