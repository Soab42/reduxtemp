/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useGetVideoQuery, useUpdateVideoMutation } from "../../features/videos/videosApi";
import CloseModal from "../CloseModal";
import { customStyles } from "../Modal";

function EditVideo({ isOpen, onRequestClose, id}) {
  const {data:video} = useGetVideoQuery(id);

  const [updateVideo]=useUpdateVideoMutation()
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  

  useEffect(()=>{
    setTitle(video?.title);
    setDescription(video?.description);
    setUrl(video?.url);
    setDuration(parseFloat(video?.duration));
    setViews(video?.views);
  },[video])
  
  const handleChange = ({ target: { name, value } }) => {
    const stateUpdater = {
      title: setTitle,
      description: setDescription,
      url: setUrl,
      views: setViews,
      duration: setDuration,
  
    };
    stateUpdater[name](value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const videoData={ title, description, url, views, duration };
   
    updateVideo({id,videoData});
    onRequestClose()
  };
  const handleReset=()=>{
    setTitle("");
    setDescription("");
    setUrl("");
    setViews("");
    setDuration("")
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Quiz"
    >
      <h2 className="text-slate-400 text-center font-bold text-xl">Add Video</h2>
      <CloseModal onRequestClose={onRequestClose}/>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 text-black w-[80vw] max-h-[80vh]">
          <div className="">
            <label label className="block text-slate-400 font-bold mb-2" >Title:</label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
              type="text"
              id="title"
              name="title"
              value={title}
              required
              onChange={handleChange}
            />
          </div>
          
          <div className="">
            <label label className="block text-slate-400 font-bold mb-2" htmlFor="url">URL:</label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
              type="url"
              id="url"
              name="url"
              value={url}
              required
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label label className="block text-slate-400 font-bold mb-2" htmlFor="views">Views:</label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
              type="text"
              id="views"
              name="views"
              value={views}
              required
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label label className="block text-slate-400 font-bold mb-2" htmlFor="duration">Duration:</label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-slate-300"
              type="number"
              id="duration"
              name="duration"
              value={duration}
              required
              step="0.1"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label label className="block text-slate-400 font-bold mb-2" htmlFor="description">Description:</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg bg-slate-300 h-32 "
              id="description"
              name="description"
              required
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <button
              className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline" type="submit">Update Video</button>
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
}

export default EditVideo;
