import $ from "@/axios";

export function paymentAPI(
  customerData: any,
  shippingData: any,
  totalPrice: any
) {
  // console.log('look i got here');
  return $({
    url: "/api/pay",
    method: "post",
    data: { customerData, shippingData, totalPrice },
  });
}

export function verifyAPI(data: any) {
  // console.log('look i got here');
  return $({
    url: "/api/verify",
    method: "post",
    data: data,
  });
}
