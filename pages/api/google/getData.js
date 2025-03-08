import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), 
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Sheet1!A1:E";

    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    res.json(response.data);
  } catch (error) {
    console.error("❌ Google Sheets API Error:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
}
