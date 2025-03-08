import { google } from "googleapis";

let io;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const { data } = req.body;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      resource: { values: data },
    });

    if (io) {
      io.emit("dataUpdated", data);
    }

    res.status(200).json({ message: "Data updated successfully!" });
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    res.status(500).json({ error: "Failed to update data", details: error.message });
  }
}
