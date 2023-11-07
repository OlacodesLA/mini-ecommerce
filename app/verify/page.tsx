"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { emailAPI, verifyAPI } from "@/axios/endpoints/payment.endpoint";
import { Bars } from "react-loader-spinner";
import { doc, setDoc } from "firebase/firestore";
import { salesCollectionRef } from "@/utils";
import { formattedCurrentDateTime } from "@/utils";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customerData, setCustomerData] = useState({});
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    const getQueryParam = (paramName: string) => {
      try {
        return searchParams.get(paramName) || "";
      } catch (error) {
        console.error(
          `Error retrieving ${paramName} query parameter: ${error}`
        );
        return "";
      }
    };

    const status = getQueryParam("status");
    const tx_ref = getQueryParam("tx_ref");
    const transaction_id = getQueryParam("transaction_id");

    const customerInfo = JSON.parse(
      localStorage.getItem("customerFormData") || "{}"
    );
    const shippingInfo = JSON.parse(
      localStorage.getItem("shippingFormData") || "{}"
    );
    const paymentInfo = JSON.parse(
      localStorage.getItem("paymentFormData") || "{}"
    );
    const cartInfo = JSON.parse(localStorage.getItem("cart") || "{}");

    console.log({ ...customerInfo, ...shippingInfo, ...paymentInfo });

    const createSale = async (price: number) => {
      const userDoc = doc(salesCollectionRef, tx_ref);
      // Set the user
      await setDoc(userDoc, {
        customerInfo,
        shippingInfo,
        paymentInfo,
        cartInfo,
        status: status,
        createdAt: formattedCurrentDateTime,
        totalPrice: price,
      });
      setSuccess(true);
    };

    const sendEmail = async (price: number) => {
      try {
        const createdAt = formattedCurrentDateTime;
        const totalPrice = price;
        emailAPI(
          customerInfo,
          shippingInfo,
          totalPrice,
          cartInfo,
          createdAt
        ).then((response: any) => {
          console.log(response);
        });
      } catch (error) {}
      setSuccess(true);
    };

    // You can perform actions based on these values
    if (status === "completed" || status === "successful") {
      // Payment was completed, handle accordingly
      try {
        verifyAPI({
          transaction_id,
        })
          .then((response: any) => {
            console.log("Verification response", response);
            const { serverResponse, error } = response;
            if (!error) {
              if (serverResponse === undefined) {
                setSuccess(false);
              } else {
                const { data } = serverResponse;
                setCustomerData(data.meta);
                if (data.amount) {
                  createSale(data.amount);
                  sendEmail(data.amount);
                }
                setIsLoading(false);
                setSuccess(true);
                console.log(data);
              }

              console.log(error);
            } else {
              setSuccess(false);
            }
          })
          // .then(() => {
          //   createSale();
          //   setIsLoading(false);
          // })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    } else if (status === "cancelled") {
      // Payment was not completed, handle accordingly

      setCancelled(true);
      setSuccess(false);
      setIsLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="h-screen mt-40">
      {!success && !isLoading && !cancelled && (
        <div className="my-5">
          <h1 className="text-2xl sm:text-4xl text-center font-bold ">
            Payment not found
          </h1>
          <p className="text-center pt-4">sorry your payment was not found</p>
        </div>
      )}

      {success && !isLoading && !cancelled && (
        <div className="my-5">
          <h1 className="text-2xl sm:text-4xl text-center font-bold ">
            Payment Successful
          </h1>
          <h1 className="text-2xl sm:text-4xl text-center font-bold ">🎉</h1>
          <p className="text-center pt-4 px-2">
            Your payment was successfully. An email has been sent to you for
            confirmation{" "}
          </p>
        </div>
      )}

      {!isLoading && cancelled && (
        <div className="my-5">
          <h1 className="text-2xl sm:text-4xl text-center font-bold ">
            Payment Cancelled
          </h1>
          <p className="text-center pt-4">Your payment has been cancelled</p>
        </div>
      )}

      <div className="">
        {isLoading && (
          <div className="">
            <div className="my-5">
              <h1 className="text-2xl sm:text-4xl text-center font-bold ">
                Verifying Payment
              </h1>
              <p className="text-center pt-4">please wait...</p>
            </div>
            <div className="w-full flex justify-center">
              <Bars
                height="80"
                width="80"
                color="#fe019a"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
