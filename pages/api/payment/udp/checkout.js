import axios from "axios";

import { pick } from "@/utils";
import prices from "@/data/price.json";

const redirect_url = "https://copywriterpro.ai/";
const cancel_url = "https://copywriterpro.ai/bd-pricing";
const webhook_url = "https://api.copywriterpro.ai/v1/payments/udp-webhook";
const checkoutURL = "https://bdpayments.copywriterpro.ai/api/checkout";

const apiKey = process.env.UDDOKTAPAY_API;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = pick(req.body, ["full_name", "email", "metadata"]);
      const priceKey = data?.metadata?.price_key;
      const isPriceKey = Object.keys(prices).includes(priceKey);

      if (isPriceKey) {
        const amount = prices[priceKey].price.bdt;
        const payload = {
          redirect_url,
          cancel_url,
          webhook_url,
          amount,
          ...data,
        };
        const response = await axios.post(checkoutURL, payload, {
          headers: {
            "RT-UDDOKTAPAY-API-KEY": `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        return res.status(200).json(response.data);
      } else {
        return res.status(402).json({ success: false, message: "Bad request" });
      }
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "internal server error";
      res.status(status).json({ success: false, message });
    }
  } else {
    res.status(200).json({ success: true, message: "System up" });
  }
}
