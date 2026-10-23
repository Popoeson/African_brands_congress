import { createSign } from "node:crypto";

const TIMEOUT_MS = 10000;
let cached = { token: null, expires: 0 };

const b64url = (input) => Buffer.from(input).toString("base64url");

async function getToken() {
  if (cached.token && Date.now() < cached.expires - 60000) return cached.token;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !rawKey) throw new Error("Google service account variables are not set");

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(rawKey.replace(/\\n/g, "\n"), "base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Google token request responded ${res.status}`);

  const data = await res.json();
  cached = { token: data.access_token, expires: Date.now() + (data.expires_in || 3600) * 1000 };
  return cached.token;
}

/** Append one row to the named tab. RAW means text is stored as typed, never as a formula. */
export async function appendRow(tab, row) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID is not set");

  const token = await getToken();
  const range = encodeURIComponent(`${tab}!A1`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Sheets responded ${res.status}`);
}