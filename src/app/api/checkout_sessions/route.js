import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/lib/stripe";
import { userdata } from "@/app/Action/Userinfo";
 

export async function POST(request) {
  try {
    const formData = await request.formData();

    const productID = formData.get("productid");
    const Coverimg = formData.get("image");
    const booktitle = formData.get("title");
    const price = Number(formData.get("price"));
    const writerid = formData.get("writerid");

    const headersList = await headers();
    const origin = headersList.get("origin");

     const user = await userdata()

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
       customer_email: user?.email || undefined,

         metadata: {
        userId: user?.id || "",
        productId: productID?.toString() || "",
        coverimg: Coverimg,
        booktitle:  booktitle,
        WriterId: writerid,

      },


      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Product ${productID}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}