const AvailableSlot = require('../models/availableSlotModel');

const AvailableSlotControllers = {
    getAvailableSlot: async (req, res) => {
        try {
            const slots = await AvailableSlot.findAll();
            // console.log("slots in getAvailableSlot ", slots);
            res.json(slots);
        } catch (error) {
            console.log("Error in fetching slots", error);
            res.status(500).json({ error: "Failed to fetch slots" });
        }
    },

    createSlotToAvailable: async (req, res) => {
        const { name, time, slot, slotId } = req.body;
        // console.log("Req.body inside createSlottoavailable is ",req.body);
        try {
            const newSlot = await AvailableSlot.create({ name, time, slot, slotId });
            res.status(201).json(newSlot);
        } catch (error) {
            console.log("Error in creating slot", error);
            res.status(500).json({ error: "Failed to create slot" });
        }
    },

    updateSlot: async (req, res) => {
        const { id } = req.params;
        const { slot } = req.body;
        // console.log("id hai delslot me ",id);
        // console.log("Req.params==>>",req.params);
        // console.log("req.body delslot me ",req.body);
        // console.log("Available slot in updateslot ",AvailableSlot);
        try {
            const slotToUpdate = await AvailableSlot.findByPk(id);
            if (!slotToUpdate) {
                return res.status(404).json({ error: "Slot not found" });
            }
            slotToUpdate.slot = slot;
            await slotToUpdate.save();
            res.json(slotToUpdate);
        } catch (error) {
            console.log("Error in updating slot", error);
            res.status(500).json({ error: "Failed to update slot" });
        }
    },

    deleteSlot: async (req, res) => {
        const { id } = req.params;
       
        
        try {
            const slotToDelete = await AvailableSlot.findByPk(id);
            if (!slotToDelete) {
                return res.status(404).json({ error: "Slot not found" });
            }
            await slotToDelete.destroy();
            res.status(200).json({ message: "Slot deleted successfully" });
        } catch (error) {
            console.log("Error in deleting slot", error);
            res.status(500).json({ error: "Failed to delete slot" });
        }
    }
};

module.exports = AvailableSlotControllers;
