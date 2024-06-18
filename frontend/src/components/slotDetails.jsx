import React, { useContext, useState } from "react";
import SlotBook from "../store/SlotBookContext";

/* FIRST PART: ENTER SLOT DETAILS MENTOR NAME AVAILABLE SLOT AND SUBMIT */

function SlotDetails() {
  const { addSlot } = useContext(SlotBook);

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [slot, setSlot] = useState("");

  const obj = {
    name: name,
    time: time,
    slot: slot,
    slotId: Math.floor(Math.random() * 199),
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("obj=> ", obj);
    addSlot(obj);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-[#046169] p-4 rounded-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
    >
      <span className="text-2xl text-gray-50 font-medium font-serif m-4 mr-6">
        Enter Slot Details
      </span>
      <input
        className="bg-yellow-200 placeholder-black hover:bg-lime-100 rounded-lg p-2 w-full md:w-auto"
        type="text"
        placeholder="Mentor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="bg-yellow-200 placeholder-black hover:bg-lime-100 rounded-lg p-2 w-full md:w-auto"
        type="number"
        placeholder="Available Slot"
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
      />
      <input
        className="bg-yellow-200 placeholder-black hover:bg-lime-100 rounded-lg p-2 w-full md:w-auto"
        type="time"
        placeholder="Available time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button className="bg-lime-300 hover:bg-amber-300 p-1.5 ml-2 rounded-sm w-full md:w-auto">
        Submit
      </button>
    </form>
  );
}

export default SlotDetails;
