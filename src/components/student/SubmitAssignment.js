/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAddAssignmentMarkMutation } from "../../features/marks/assignmentMarksApi";
import { createdAt } from "../../utils/createdAt";
import { customStyles } from "../Modal";

const SubmitAssignment = ({ isOpen, onRequestClose, onSubmit, data }) => {
  const [repoLink, setRepoLink] = useState("");
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const [addAssignmentMark] = useAddAssignmentMarkMutation();
  const handleSubmit = (event) => {
    event.preventDefault();

    const [assignmentDetails] = data;

    const assignment = {
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: assignmentDetails?.id,
      title: assignmentDetails?.title,
      createdAt: createdAt(),
      totalMark: assignmentDetails?.totalMark,
      mark: 0,
      repo_link: repoLink,
      status: "pending"
    };
    addAssignmentMark(assignment).unwrap(navigate("/leaderboard"));
  };

  const handleReset = () => {
    setRepoLink("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Quiz"
    >
      <h2 className="text-slate-400 text-center font-bold text-xl mb-4">
        Submit Assignment repository Link
      </h2>
      <h1 className="text-blue-400 text-start font-thin text-xl mb-4">
        {data?.length > 0 && data[0]?.title}
      </h1>
      <div
        className="h5 w-5 cursor-pointer absolute right-3 top-3"
        onClick={onRequestClose}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g clipPath="url(#clip0_429_11210)">
              {" "}
              <path
                d="M21 11.9999C21 16.9705 16.9706 20.9999 12 20.9999C7.02944 20.9999 3 16.9705 3 11.9999C3 7.02938 7.02944 2.99994 12 2.99994"
                stroke="#ff0000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M19 5.00006L16 8.00006"
                stroke="#ff0000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M15.9999 5.00005L19 7.99991"
                stroke="#ff0000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
            <defs>
              {" "}
              <clipPath id="clip0_429_11210">
                {" "}
                <rect width="24" height="24" fill="white"></rect>{" "}
              </clipPath>{" "}
            </defs>{" "}
          </g>
        </svg>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 text-black w-[40vw] max-h-[80vh]">
          <div className="col-span-2">
            <input
              type="text"
              id="assignment"
              name="assignment"
              value={repoLink}
              onChange={(event) => setRepoLink(event.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
            />
          </div>

          <div className="flex space-around ">
            <button
              type="submit"
              className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline"
            >
              Submit Assignment
            </button>
          </div>
          <div className="flex space-around gap-2 justify-end">
            <button
              type=""
              onClick={handleReset}
              className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline w-24"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SubmitAssignment;
