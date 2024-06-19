const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/database");
const availableSlotController = require("./controllers/availableSlotController");
const scheduledMeetingController = require("./controllers/scheduledMeetingController");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/available-slots", availableSlotController.getAvailableSlot);
app.post("/api/available-slots", availableSlotController.createSlotToAvailable);
app.put("/api/available-slots/:id", availableSlotController.updateSlot);
app.delete("/api/available-slots/:id", availableSlotController.deleteSlot);

app.get(
  "/api/scheduled-meetings",
  scheduledMeetingController.getScheduledMeetings
);
app.post(
  "/api/scheduled-meetings",
  scheduledMeetingController.createScheduledMeeting
);
app.delete(
  "/api/scheduled-meetings/:id",
  scheduledMeetingController.deleteScheduledMeeting
);

db.sync()
  .then(() => {
    console.log("All tables synced successfully");
    app.listen(3001, () => {
      console.log("App started on http://localhost:3001");
    });
  })
  .catch((error) => {
    console.error("Error syncing tables:", error);
  });
