import React, { createContext, useState } from "react";

const SlotBook = createContext();

export const SlotBookProvider = ({ children }) => {
  const [slotDetail, setSlotDetails] = useState([]);
  const [inputUserData, setInputUserData] = useState("");
  const [mentorData, setMentorData] = useState("");
  const [open, setOpen] = useState(false); //FOR TOGGLE
  const [scheduledMeet, setScheduledMeet] = useState([]);

  /* TO ADD SLOT FIRST TIME */
  const addSlot = (data) => {
    setSlotDetails((prevData) => [...prevData, data]);
  };

  console.log("SlotDetail in context is ", slotDetail);
  console.log("Clicked Mentor data in context  ",mentorData);
  console.log("scheduledMeet=> ",scheduledMeet);

  /* USER DATA:  NAME AND EMAIL IN FORM */
  const userInputData = (data) => {
    setInputUserData(data);
  };

  /* WHEN ANY ONE CLICK ON 2ND PART TABLE THAN MENTOR DATA */
  const slotMentorData = (data) => {
    setMentorData(data);
  };

  /* FOR SCHEDULED MEETING */
  const scheduledMeeting = (obj) => {
    console.log("Obj in scheduledmeeting ", obj);
    setScheduledMeet((prevData) => [...prevData, obj]);
  };

  /* FOR UPDATE QUANTITY */
  const updateQuantity = () => {
    setSlotDetails(
      (prevDetails) =>
        prevDetails
          .map((data) =>
            data.slotId === mentorData.slotId
              ? { ...data, slot: Math.max(data.slot - 1, 0) }
              : data
          )
          .filter((data) => data.slot > 0) // Remove slots with a quantity of 0
    );
  };
  const deleteAndUpdate = (user) => {
    // Remove user from scheduledMeet
    console.log("user in deland update ",user);
    setScheduledMeet((prevMeets) =>
      prevMeets.filter((meeting) => meeting.userId !== user.userId)
    );

    // Check if the slot exists in slotDetail
    const slotExists = slotDetail.some((data) => data.slotId === user.slotId);

    if (slotExists) {
      // Increase the slot quantity if it exists
      setSlotDetails((prevDetails) =>
        prevDetails.map((data) =>
          data.slotId === user.slotId ? { ...data, slot: data.slot + 1 } : data
        )
      );
    } else {
      // Add the slot back with quantity 1 if it doesn't exist
      const newSlot = {
        slotId: user.slotId,
        name: user.mentorName,
        slot: 1,
        time: user.time, // assuming time is part of user object
      };
      setSlotDetails((prevDetails) => [...prevDetails, newSlot]);
    }
  };

  // console.log("scheduledMeet in context ",scheduledMeet);
  return (
    <SlotBook.Provider
      value={{
        updateQuantity,
        inputUserData,
        mentorData,
        setMentorData,
        addSlot,
        slotDetail,
        setSlotDetails,
        userInputData,
        open,
        setOpen,
        slotMentorData,
        scheduledMeeting,
        scheduledMeet,
        deleteAndUpdate,
      }}
    >
      {children}
    </SlotBook.Provider>
  );
};

export default SlotBook;
