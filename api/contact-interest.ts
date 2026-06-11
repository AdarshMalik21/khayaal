import type { IncomingMessage, ServerResponse } from "node:http";

const recipientEmail = "adarsh.malik@startappss.com";
const senderEmail = "Khayaal Foundation <onboarding@resend.dev>";

type ContactInterestPayload = {
  title?: string;
  desc?: string;
  cta?: string;
  variant?: string;
};

function readRequestBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, {
      ok: false,
      error: "RESEND_API_KEY is not configured.",
    });
    return;
  }

  try {
    const rawBody = await readRequestBody(req);
    const payload = JSON.parse(rawBody) as ContactInterestPayload;

    if (!payload.title || !payload.desc || !payload.cta) {
      sendJson(res, 400, {
        ok: false,
        error: "Missing required contact details.",
      });
      return;
    }

    const subject = `Khayaal website interest: ${payload.title}`;
    const text = [
      "Hello Khayaal team,",
      "",
      "A visitor clicked a Get Involved card on the website.",
      `Title: ${payload.title}`,
      `Description: ${payload.desc}`,
      `CTA clicked: ${payload.cta}`,
      `Variant: ${payload.variant ?? "unknown"}`,
      "Section: Get Involved & Contact",
      "",
      "Please follow up with the next steps.",
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [recipientEmail],
        subject,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      sendJson(res, 502, {
        ok: false,
        error: "Resend rejected the email request.",
        details: errorText,
      });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 500, { ok: false, error: "Unable to send the email." });
  }
}
