import { collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const salesCollectionRef = collection(db, "christmas-sales");

export function fmtResponse(responseData: any, error: boolean) {
  const { status, data } = responseData;

  if (error) {
    console.log(data);

    return {
      status,
      serverResponse: data.data,
      error: true,
    };
  } else {
    console.log(data);
    return {
      status,
      serverResponse: data.data,
      error: false,
    };
  }
}

export const textToDot = (text: string, max: number) => {
  return text.length > max ? `${text.substring(0, max)}...` : text;
};

function formatCurrentDateTime() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  let hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const amOrPm = hour >= 12 ? "p.m." : "a.m.";

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  const formattedDateTime = `${month} ${day}, ${year} at ${hour}:${
    minute < 10 ? "0" : ""
  }${minute} ${amOrPm}`;
  return formattedDateTime;
}

// Get and format the current date and time
export const formattedCurrentDateTime = formatCurrentDateTime();
