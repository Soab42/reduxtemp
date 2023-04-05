/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "react-modal";
import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery
} from "../../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import CloseModal from "../CloseModal";
import { customStyles } from "../Modal";

const AddAssignment = ({ isOpen, onRequestClose }) => {
  const [assignment, setAssignment] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [videoId, setVideoId] = useState("");

  const { data: videos } = useGetVideosQuery();
  const { data: assignments } = useGetAssignmentsQuery();
  const [addAssignment] = useAddAssignmentMutation();
  const filteredVideos = videos?.filter(
    (video) => !assignments?.map((A) => A.video_id).includes(video.id)
  );

  const selectedVideo = videos?.filter((video) => video.id == videoId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const assignmentData = {
      title: assignment,
      video_id: Number(videoId),
      video_title: selectedVideo[0]?.title,
      totalMark: Number(totalMark)
    };

    addAssignment(assignmentData);
    onRequestClose();
  };

  const handleReset = () => {
    setAssignment("");
    setVideoId("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Quiz"
    >
      <h2 className="text-slate-400 text-center font-bold text-xl">
        Add Assignment
      </h2>
      <CloseModal onRequestClose={onRequestClose} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 text-black w-[40vw] max-h-[80vh]">
          <div className="col-span-2">
            <label className="block text-slate-400 font-bold mb-2">
              Assignment Name:
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={assignment}
              onChange={(event) => setAssignment(event.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-slate-400 font-bold mb-2">
              Video Title:
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
              id="videoTitle"
              name="videoTitle"
              onChange={(event) => {
                setVideoId(event.target.value);
              }}
              required
            >
              <option defaultValue={"select videos.."}>Select option</option>
              {filteredVideos?.map((video) => (
                <option
                  key={video.id}
                  className="w-full px-4 py-2 border rounded-lg bg-slate-300 h-62"
                  value={video.id}
                  name={video.title}
                >
                  {video.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-slate-400 font-bold mb-2">
              Total Mark:
            </label>
            <input
              type="number"
              id="totalMark"
              name="totalMark"
              value={totalMark}
              onChange={(event) => setTotalMark(event.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
            />
          </div>
          <div className="flex space-around ">
            <button
              type="submit"
              className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline"
            >
              Add Assignment
            </button>
          </div>
          <div className="flex space-around gap-2 justify-end">
            <button
              type=""
              onClick={handleReset}
              className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline w-36"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddAssignment;
