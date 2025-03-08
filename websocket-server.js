// import { Server } from "socket.io";
// import { google } from "googleapis";
// import dotenv from "dotenv";

// dotenv.config();

// const io = new Server(3001, { cors: { origin: "*" } });

// const fetchGoogleSheetData = async () => {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         type: "service_account",
//         project_id: process.env.GOOGLE_PROJECT_ID,
//         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//         client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });
//     const spreadsheetId = process.env.SPREADSHEET_ID;
//     const range = "Sheet1!A1:Z"; // ✅ Fetch all rows & columns

//     const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
//     let rows = response.data.values || [];

//     const maxColumns = Math.max(...rows.map(row => row.length));
//     rows = rows.map(row => [...row, ...Array(maxColumns - row.length).fill("")]);

//     return rows;
//   } catch (error) {
//     console.error("Google Sheets API Error:", error);
//     return [];
//   }
// };

// io.on("connection", async (socket) => {
//   console.log("Client connected to WebSocket");

//   const sendData = async () => {
//     const data = await fetchGoogleSheetData();
//     socket.emit("dataUpdated", data);
//   };

//   sendData();
//   setInterval(sendData, 5000); // ✅ Refresh every 5 seconds

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// console.log("WebSocket Server Started on Port 3001");
