"use client";
import { DefaultButton } from "@/components/button";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

type Props = {};

const Test = (props: Props) => {
  const emailSend = () => {
    axios
      .get("/api/mail")
      .then((res) => {
        console.log("true");
        toast.success("success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  };
  return (
    <div>
      <DefaultButton label="Send Email" click={emailSend} type="button" />
    </div>
  );
};

export default Test;
