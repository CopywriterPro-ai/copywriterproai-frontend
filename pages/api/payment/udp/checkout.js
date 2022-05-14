import axios from "axios";

import { pick } from "@/utils";

const redirect_url = "https://copywriterpro.ai/";
const cancel_url = "https://copywriterpro.ai/bd-pricing";
const webhook_url = "https://api.copywriterpro.ai/udp-webhook";
const checkoutURL = "https://bdpayments.copywriterpro.ai/api/checkout";

const apiKey = process.env.UDDOKTAPAY_API;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = pick(req.body, ["full_name", "email", "amount", "metadata"]);
      const payload = { redirect_url, cancel_url, webhook_url, ...data };
      const response = await axios.post(checkoutURL, payload, {
        headers: {
          "RT-UDDOKTAPAY-API-KEY": `${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "internal server error";
      res.status(status).json({ success: "false", message });
    }
  } else {
    res.status(200).json({ success: true, message: "System up" });
  }
}
