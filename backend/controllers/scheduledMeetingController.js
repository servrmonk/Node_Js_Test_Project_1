const ScheduledMeeting = require('../models/scheduledMeetingModel');

const ScheduledMeetingControllers = {
    getScheduledMeetings: async (req, res) => {
        try {
            const meetings = await ScheduledMeeting.findAll();
            // console.log("meetings in getScheduledMeetings ", meetings);
            res.json(meetings);
        } catch (error) {
            console.log("Error in fetching meetings", error);
            res.status(500).json({ error: "Failed to fetch meetings" });
        }
    },

    createScheduledMeeting: async (req, res) => {
        const { mentorName, candidateName, joinLink, time, slotId, userId } = req.body;
        // console.log("Req.body in createscheduledMeeting ",req.body);
        try {
            const newMeeting = await ScheduledMeeting.create({ mentorName, candidateName, joinLink, time, slotId, userId });
            res.status(201).json(newMeeting);
        } catch (error) {
            console.log("Error in creating meeting", error);
            res.status(500).json({ error: "Failed to create meeting" });
        }
    },

    deleteScheduledMeeting: async (req, res) => {
        const { id } = req.params;
        try {
            const meetingToDelete = await ScheduledMeeting.findByPk(id);
            if (!meetingToDelete) {
                return res.status(404).json({ error: "Meeting not found" });
            }
            await meetingToDelete.destroy();
            res.json({ message: "Meeting deleted successfully" });
        } catch (error) {
            console.log("Error in deleting meeting", error);
            res.status(500).json({ error: "Failed to delete meeting" });
        }
    }
};

module.exports = ScheduledMeetingControllers;
