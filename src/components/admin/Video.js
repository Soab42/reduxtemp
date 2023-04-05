/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDeleteVideoMutation } from "../../features/videos/videosApi";
import { deleteSvg, editSvg } from "../ui/svg";
import EditVideo from "./EditVideo";

export default function Video({ video }) {
  const { title, description, id } = video;
  const [deleteVideo] = useDeleteVideoMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    // add the quiz
    // set the isModalOpen state variable to false to close the modal
    setIsModalOpen(false);
  };
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">
        {`${description.split(" ").slice(0, 20).join(" ")}...`}
      </td>
      <td className="table-td flex gap-x-2 flex justify-center">
        <span onClick={() => deleteVideo(id)}>{deleteSvg}</span>

        <span onClick={openModal}>{editSvg}</span>
        <EditVideo
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          id={id}
        />
      </td>
    </tr>
  );
}
