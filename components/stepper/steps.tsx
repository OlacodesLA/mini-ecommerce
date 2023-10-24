"use client";
import React, { useState, useEffect, useContext } from "react";
import { TiTick } from "react-icons/ti";
import CustomerInfo from "../customerInfo";
import PaymentInfo from "../paymentInfo";
import ShippingInfo from "../shippingInfo";
import { CartContext } from "@/context/stateContext";

const isBrowser = typeof window !== "undefined"; // Check if the code is running in the browser

const Stepper: React.FC = () => {
  const steps = ["Customer Info", "Shipping Info", "Payment Info"];
  const [complete, setComplete] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(
    isBrowser ? getCurrentStepFromLocalStorage() : 1
  );

  const { cart } = useContext(CartContext)!;

  function getCurrentStepFromLocalStorage() {
    if (isBrowser) {
      const savedStep = localStorage.getItem("currentStep");
      return savedStep ? parseInt(savedStep, 10) : 1;
    }
    return 1; // Default value for server-side rendering
  }

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("currentStep", currentStep.toString());

      if (complete) {
        localStorage.removeItem("currentStep");
      }
    }
  }, [currentStep, complete]);

  console.log(currentStep);

  const onNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setComplete(true);
    }
  };

  const onPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white py-10 px-4 rounded-md">
      <div className="flex w-full justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500 sm:text-base text-sm">{step}</p>
          </div>
        ))}
      </div>
      <div className="w-full mt-10">
        <div className="w-full  sm:max-w-lg mx-auto">
          {currentStep === 1 && <CustomerInfo onNextStep={onNextStep} />}
        </div>
        <div className="w-full sm:max-w-lg mx-auto">
          {currentStep === 2 && (
            <ShippingInfo onNextStep={onNextStep} onPrevStep={onPrevStep} />
          )}
        </div>
        <div className="w-full sm:max-w-lg mx-auto">
          {currentStep === 3 && (
            <PaymentInfo onNextStep={onNextStep} onPrevStep={onPrevStep} />
          )}
        </div>
      </div>
      <div className="flex w-full gap-2 justify-end max-w-lg mx-auto mt-10"></div>
    </div>
  );
};

export default Stepper;
