import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Sheet1!A1:Z"; 

    console.log("Fetching data from Google Sheets...");
    
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });

    let rows = response.data.values || [];

    const maxColumns = Math.max(...rows.map(row => row.length));
    rows = rows.map(row => [...row, ...Array(maxColumns - row.length).fill("")]);

    res.status(200).json({ values: rows });
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
}
