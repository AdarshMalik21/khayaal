import {
  defineConfig,
  loadEnv,
  type ViteDevServer,
  type PreviewServer,
} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";

type ContactInterestPayload = {
  title?: string;
  desc?: string;
  cta?: string;
  variant?: string;
};

const recipientEmail = "adarsh.malik@startappss.com";
const senderEmail = "Khayaal Foundation <onboarding@resend.dev>";

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

function registerContactInterestRoute(
  server:
    | Pick<ViteDevServer, "middlewares">
    | Pick<PreviewServer, "middlewares">,
  resendApiKey?: string,
) {
  server.middlewares.use(
    "/api/contact-interest",
    async (
      req: IncomingMessage,
      res: ServerResponse,
      next: (err?: unknown) => void,
    ) => {
      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
      }

      if (req.method !== "POST") {
        next();
        return;
      }

      const apiKey = resendApiKey;
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
    },
  );
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "khayaal-contact-interest-route",
        configureServer(server) {
          registerContactInterestRoute(server, resendApiKey);
        },
        configurePreviewServer(server) {
          registerContactInterestRoute(server, resendApiKey);
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/assets"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
  };
});
