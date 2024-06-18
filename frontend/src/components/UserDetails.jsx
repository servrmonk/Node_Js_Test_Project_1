import React, { useContext, useState } from "react";
import SlotBook from "../store/SlotBookContext";

/* WHEN USER CLICK TO BOOK THE SLOT FORM WILL OPEN */

export default function UserDetails() {
  const { userInputData, setOpen, scheduledMeeting, mentorData ,updateQuantity} =
    useContext(SlotBook);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const obj = {
    userName: name,
    userMail: email,
    userId: Math.floor(Math.random() * 59 + 91),
  };
  
  function submitHandler(e) {
    e.preventDefault();
    userInputData(obj);
    // console.log("obj in userDetails is ", obj);
    setOpen(false);
    updateQuantity()
    const objForScheduled = {
      mentorName: mentorData.name,
      slotId: mentorData.slotId,
      userId:Math.floor(Math.random() * 16.9+6),
      candidateName: obj.userName,
      joinLink: "https://meet.google.com/mmq-xvru-avp",
      time: mentorData.time,
    };
    
    // console.log("objforscheduled in userDetails", objForScheduled);
    scheduledMeeting(objForScheduled)
  }

  return (
    <form
      className="max-w-md mx-auto border-2 mt-0  border-cyan-600 rounded-lg bg-slate-100 p-5 shadow-md relative"
      onSubmit={submitHandler}
    >
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={() => setOpen(false)}
      >
        ×
      </button>
      <h1 className="mb-2 text-xl font-semibold">Booking Form</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-600"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-600"
          placeholder="Enter your email"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none"
      >
        Book
      </button>
    </form>
  );
}
