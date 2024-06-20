import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const SlotBook = createContext();
const url = `http://localhost:3001`;

export const SlotBookProvider = ({ children }) => {
  const [slotDetail, setSlotDetails] = useState([]); //FIRST TIME WHEN SLOT DETAIL IS FILLED
  // AND THEN IN SLOTDETAIL IS RENDERED IN AVAILABLE SLOT 2ND PART
  const [mentorData, setMentorData] = useState(""); //WHEN ANY ONE CLICKON 2ND PART THAN THE CURRENT MENTOR DATA WILL FILLED
  const [inputUserData, setInputUserData] = useState(""); //THIS WILL TAKE NAME AND EMAIL OF THE POPPEDUP FORM
  const [open, setOpen] = useState(false); //FOR TOGGLE
  const [scheduledMeet, setScheduledMeet] = useState([]); //THIS WILL COMBINE MENTOR DATA AND INTERUSERDATA AND DO scheduled meet

  /* TO ADD SLOT FIRST TIME:NAME,SLOT QTY,TIME */
  const addSlot = (data) => {
    axios
      .post(`${url}/api/available-slots`, data)
      .then((response) => {
        setSlotDetails((prevData) => [...prevData, response.data]);
        console.log("Data Posted in addslot", response.data);
      })
      .catch((error) => console.error("Error in posting slots:", error));
  };

  /* USER DATA WHEN ANY ONE CLICK ON 2ND PART THE FORM WILL POPUP:  NAME AND EMAIL IN FORM */
  const userInputData = (data) => {
    setInputUserData(data);
  };

  /* WHEN ANY ONE CLICK ON 2ND PART TABLE THAN MENTOR DATA */
  const slotMentorData = (data) => {
    setMentorData(data);
  };

  /* FOR SCHEDULED MEETING */
  const scheduledMeeting = (obj) => {
    // console.log("Obj in scheduledmeeting ", obj);
    // setScheduledMeet((prevData) => [...prevData, obj]);

    axios
      .post(`${url}/api/scheduled-meetings`, obj)
      .then((response) => {
        setScheduledMeet((prevData) => [...prevData, response.data]);
        console.log("Data Posted in scheduled meet", response.data);
      })
      .catch((error) => console.error("Error in posting slots:", error));
  };

  // Inside SlotBookProvider component
  const updateQuantity = () => {
    console.log("Slot details in updateqty ", slotDetail);
    console.log("mentorsdata +>", mentorData);

    if (mentorData.slot > 1) {
      axios
        .put(`${url}/api/available-slots/${mentorData.id}`, {
          slot: mentorData.slot - 1,
          // slot: mentorData.slot - 1,
        })
        .then((res) => {
          console.log("REs in updatequnatity ", res);
          setSlotDetails((prevDetails) =>
            prevDetails
              .map((data) =>
                data.slotId === mentorData.slotId
                  ? { ...data, slot: Math.max(data.slot - 1, 0) }
                  : data
              )
              .filter((data) => data.slot > 0)
          );
          console.log("Slot updated successfully", res.data);
        })
        .catch((error) => console.log("Error in upd qty ", error));
    } else {
      // IF MENTOR SLOT IS 0 THAN
      axios
        .delete(`${url}/api/available-slots/${mentorData.id}`)
        .then((res) => {
          console.log("slot is less than 1 so deleted", res);

          setSlotDetails((prevDetails) =>
            prevDetails
              .map((data) =>
                data.slotId === mentorData.slotId
                  ? { ...data, slot: Math.max(data.slot - 1, 0) }
                  : data
              )
              .filter((data) => data.slot > 0)
          );
        })
        .catch((error) => console.log("Error in upd qty ", error));
    }
  };

  const deleteAndUpdate = (user) => {
    // Remove user from scheduledMeet
    console.log("user in del and update ", user);
    // setScheduledMeet((prevMeets) =>
    //   prevMeets.filter((meeting) => meeting.userId !== user.userId)
    // );

    // DELETE REQUEST
    axios
      .delete(`${url}/api/scheduled-meetings/${user.id}`)
      .then((res) => {
        // console.log("Res in delete request", res);
        setScheduledMeet((prevMeets) =>
          prevMeets.filter((meeting) => meeting.userId !== user.userId)
        );
      })
      .catch((error) => console.log("Error in Delete ", error));

    const slotExists = slotDetail.some((data) => data.slotId === user.slotId);
    console.log("Slot Exist => ", slotExists);
    console.log("user after slotExis ", user);

    if (slotExists) {
      slotDetail.map((elm) => {
        if (elm.name == user.mentorName || elm.slotId == user.slotId) {
          console.log("Element for slotexist and put ",elm)
          console.log("user for slotexist and put ",user)

          console.log("yes elmname match ");
          axios
            .put(`${url}/api/available-slots/${user.id}`, {
              slot: elm.slot + 1,
            })
            .then((res) => {
              console.log("Result in put update and delete ", res);

              setSlotDetails((prevDetails) =>
                prevDetails.map((data) =>
                  data.slotId === user.slotId
                    ? { ...data, slot: data.slot + 1 }
                    : data
                )
              );
            })
            .catch((error) =>
              console.log("Error in put updateanddelete ", error)
            );
        }
      });
    } else {
      // Add the slot back with quantity 1 if it doesn't exist
      const newSlot = {
        slotId: user.slotId,
        name: user.mentorName,
        slot: 1,
        time: user.time, // assuming time is part of user object
      };

      axios
        .post(`${url}/api/available-slots`, newSlot)
        .then((res) => {
          console.log("Result in post req update and delete ", res);
          setSlotDetails((prevDetails) => [...prevDetails, newSlot]);
        })
        .catch((error) => console.log("Error in post updateanddelete ", error));
    }
  };

  useEffect(() => {
    // FOR GETTING AVAILABLE USER FIRST TIME
    axios
      .get(`${url}/api/available-slots`)
      .then((response) => {
        setSlotDetails(response.data);
        console.log("Data get avaislot", response.data);
      })
      .catch((error) =>
        console.error("Error in getting available slots:", error)
      );

    // FOR GETTING SCHEDULED USER FIRST TIME
    axios
      .get(`${url}/api/scheduled-meetings`)
      .then((response) => {
        setScheduledMeet(response.data);
        // console.log("Data get scheduledmeet", response.data);
      })
      .catch((error) =>
        console.error("Error in getting scheduled slots:", error)
      );
  }, []);

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
