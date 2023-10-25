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
