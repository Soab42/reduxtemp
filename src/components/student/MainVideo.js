/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import moment from "moment/moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAssignmentsByVideoIdQuery } from "../../features/assignment/assignmentApi";

import { useGetAssignmentMarkByAssignmentIdQuery } from "../../features/marks/assignmentMarksApi";
import { useGetQuizMarkByVideoIdQuery } from "../../features/marks/quizMarksApi";
import { useGetQuizzesByVideoIdQuery } from "../../features/quizes/quizesApi";

import SubmitAssignment from "./SubmitAssignment";

export default function MainVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const video = useSelector((s) => s.videos);
  const { data: quizzes } = useGetQuizzesByVideoIdQuery(video?.id);
  const { data: assignment } = useGetAssignmentsByVideoIdQuery(video?.id);
  const { data: assignmentMark } = useGetAssignmentMarkByAssignmentIdQuery({
    userId: user?.id,
    assignmentId: assignment && assignment[0]?.id
  });
  const { data: quizMark } = useGetQuizMarkByVideoIdQuery({
    userId: user?.id,
    videoId: video?.id
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    setIsModalOpen(false);
  };
  const onloadHandler = () => setIsLoading(false);
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2 relative">
      {/* iframe for video play */}
      {isLoading && (
        <div className=" aspect-video  shadow rounded-md w-full absolute ">
          <div className=" flex  justify-center items-center space-x-2 h-[80%]">
            <p className="animate-pulse text-[10rem]">.</p>
            <p className="animate-pulse text-[10rem]">.</p>
            <p className="animate-pulse text-[10rem]">.</p>
          </div>
        </div>
      )}
      <iframe
        width="100%"
        className="aspect-video"
        src={video?.url}
        title={video?.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        onLoad={onloadHandler}
      ></iframe>

      <div>
        {/* Title of videos */}
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {video?.title}
        </h1>
        {/* uploaded data of video */}
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {moment(video?.createdAt).format("D MMMM YYYY")}
          {/* 23 February 2020 */}
        </h2>

        <div className="flex gap-4">
          {/* assignment section */}
          {assignment && assignmentMark?.length === 0 ? (
            assignment?.length > 0 && (
              <button
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                onClick={openModal}
              >
                এসাইনমেন্ট জমা দিন
              </button>
            )
          ) : (
            <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-slate-700 hover:text-slate-300">
              এসাইনমেন্ট জমা দিয়েছেন
            </button>
          )}
          <SubmitAssignment
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            data={assignment}
          />
          {/* quiz section */}
          {quizzes && quizMark?.length === 0 ? (
            quizzes?.length > 0 && (
              <Link
                to={`quiz/${video.id}`}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </Link>
            )
          ) : (
            <div className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-slate-700 hover:text-slate-300 cursor-pointer">
              কুইজে অংশগ্রহণ করেছেন
            </div>
          )}
        </div>
        {/* video description */}
        <p className="mt-4 text-sm text-slate-400 leading-6">
          {video.description}
        </p>
      </div>
    </div>
  );
}
