import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const { transaction_id } = body;

  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_FLW_SECRET_KEY}`,
        },
      }
    );
    const responseData = {
      data: response.data, // Extract the response data
      status: response.status, // Extract the HTTP status code
    };
    console.log(responseData);

    return Response.json(responseData);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }));
  }
}
