/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AddVideo from "../../components/admin/AddVideos";
import Video from "../../components/admin/Video";
import { useGetVideosQuery } from "../../features/videos/videosApi";

export default function Videos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: videos,
    isLoading: videoIsLoading,
    isError: videoIsError
  } = useGetVideosQuery();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    // add the quiz
    // set the isModalOpen state variable to false to close the modal
    setIsModalOpen(false);
  };
  let content;
  if (videoIsLoading) {
    content = <div>loading....</div>;
  } else if (!videoIsLoading && videoIsError) {
    content = <div>{"There is an Error"}</div>;
  } else if (!videoIsLoading && !videoIsError && videos.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Video Title</th>
              <th className="table-th">Description</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {videos?.map((video) => (
              <Video video={video} key={video.id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (videos?.length === 0) {
    content = (
      <div className="w-full text-center text-5xl grid mt-32">
        There are currently no videos in the system. You can add videos.
        <br />
        <span className="w-full m-2 mt-16  ">
          <button
            className="rounded-full px-6 py-3 text-slate-200 font-bold text-4xl hover:bg-blue-700 animate-bounce hover:animate-none hover:text-slate-300"
            onClick={openModal}
          >
            Add Video
          </button>
        </span>
      </div>
    );
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button
              className="btn ml-auto"
              onClick={openModal}
              hidden={videos?.length === 0}
            >
              Add Video
            </button>
          </div>
          <AddVideo
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
          {content}
        </div>
      </div>
    </section>
  );
}
