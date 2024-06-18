import React, { useContext, useState } from "react";
import SlotBook from "../store/SlotBookContext";
import UserDetails from "./UserDetails";

/* SECOND PART: AVAILABLE SLOT MENTOR NAME ,TIME,SLOT AVAILABLE */

function AvailableSlot() {
  const { slotDetail, setSlotDetails, open, setOpen, slotMentorData } =
    useContext(SlotBook);

    // using slotdetails instead of static array 
  /*let arr = [
    {
      name: "Rohan",
      time: "2:00pm",
      slot: 5,
      slotId: Math.floor(Math.random() * 43.5),
    },
    {
      name: "Raju",
      time: "2:20pm",
      slot: 2,
      slotId: Math.floor(Math.random() * 93.4),
    },
    {
      name: "Shyam",
      time: "2:40pm",
      slot: 6,
      slotId: Math.floor(Math.random() * 29),
    },
    {
      name: "Mohan",
      time: "2:50pm",
      slot: 9,
      slotId: Math.floor(Math.random() * 69),
    },
  ];
  */

  function toggle(mentor) {
    setOpen(!open); // Toggles the state to show/hide UserDetails
    // console.log("mentor in toggle ", mentor);
    // console.log("open is true or false ", open);
    slotMentorData(mentor);
  }

  return (
    <>
      <div className="flex items-center">
        <div className="grow border-b border-amber-700"></div>
        <span className="shrink rounded-lg px-1 pb-1 text-amber-600 text-pretty text-3xl m-4 font-normal font-serif hover:text-teal-600 shadow-lg p-2 bg-slate-50 ">
          Available slots
        </span>
        <div className="grow border-b border-amber-700"></div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mentor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Slot Available
              </th>
            </tr>
          </thead>
          <tbody>
            {slotDetail?.map((mentor) => (
              <tr
                key={mentor.slotId}
                className="bg-white border-b dark:bg-gray-800 hover:bg-slate-200 dark:border-gray-700 hover:cursor-pointer"
                onClick={() => toggle(mentor)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {mentor.name}
                </th>
                <td className="px-6 py-4">{mentor.time}</td>
                <td className="px-6 py-4">{mentor.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center  justify-center bg-gray-800 bg-opacity-75 z-50">
          <UserDetails />
        </div>
      )}
    </>
  );
}

export default AvailableSlot;
