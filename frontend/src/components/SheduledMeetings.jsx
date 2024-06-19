import React, { useContext, useState } from "react";
import SlotBook from "../store/SlotBookContext";

/* THIRD PART: SCHEDULED MEETING WITH REMOVE BUTTON */

export default function ScheduledMeetings() {
  const { deleteAndUpdate ,scheduledMeet} = useContext(SlotBook);

  // console.log("scheduledMeet in third part ",scheduledMeet);
  const deleteHandler =(user)=>{
    // console.log("User in scheduled meeting ",user);
    deleteAndUpdate(user)
  }

  return (
    <>
      <div className="flex items-center">
        <div className="grow border-b border-teal-600"></div>
        <span className="shrink rounded-lg px-1 pb-1 text-teal-600 text-pretty text-3xl m-4 font-normal font-serif hover:text-yellow-600 shadow-lg p-2 bg-slate-50 ">
          Scheduled meetings
        </span>
        <div className="grow border-b border-teal-600"></div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mentor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Candidate Name
              </th>
              <th scope="col" className="px-6 py-3">
                Meet Link
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {scheduledMeet?.map((meeting) => (
              <tr
                key={meeting.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {meeting.mentorName}
                </th>
                <td className="px-6 py-4">{meeting.candidateName}</td>
                <td className="px-6 py-4">
                  <a
                    href={meeting.joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Join
                  </a>
                </td>
                <td className="px-6 py-4">{meeting.time}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    
                    className="font-medium text-blue-600 dark:text-blue-950 hover:bg-cyan-100 p-1
                    bg-lime-400 hover:text-pink-700 shadow-md  rounded-sm"
                    onClick={()=>deleteHandler(meeting)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
