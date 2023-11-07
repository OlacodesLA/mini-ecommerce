import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import NikeReceiptEmail from "../../../lib/confirmation";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest, res: NextResponse) {
  const YOUR_EMAIL_ADDRESS = "sales@irolagos.com";
  const body = await req.json();
  const { customerInfo } = body;
  const SEND_TO = "zaccheausjide@gmail.com";
  console.log(process.env.NEXT_PUBLIC_GSUITE_CLIENT_ID);
  console.log(process.env.NEXT_PUBLIC_GSUITE_PRIVATE_KEY);

  try {
    await sendEmail({
      //@ts-ignore
      to: [customerInfo.email, "sales@irolagos.com"],
      subject: "Order Confirmation",
      html: render(NikeReceiptEmail({ ...body })),
    });

    return Response.json(true);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }));
  }
}
