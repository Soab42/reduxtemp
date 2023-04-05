/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "react-modal";
import { useAddQuizMutation } from "../../features/quizes/quizesApi";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import CloseModal from "../CloseModal";
import { customStyles } from "../Modal";

const AddQuiz = ({ isOpen, onRequestClose }) => {
  const [question, setQuestion] = useState("");
  const [videoId, setVideoId] = useState("");
  const [options, setOptions] = useState([
    { id: "1", option: "", isCorrect: false }
  ]);
  const [addQuiz] = useAddQuizMutation();
  const { data: videos } = useGetVideosQuery();
  const handleOptionChange = (optionIndex) => {
    const newOptions = options.map((option) => ({
      ...option,
      isCorrect: option.id === optionIndex
    }));
    setOptions(newOptions);
  };
  const selectedVideo = videos?.filter((video) => video.id == videoId);
  const handleSubmit = (event) => {
    event.preventDefault();
    const quiz = {
      question,
      video_id: videoId,
      video_title: selectedVideo[0]?.title,
      options
    };
    addQuiz(quiz);
    onRequestClose();
  };
  const handleAddOption = () => {
    const newOptionId = String(parseInt(options[options.length - 1].id) + 1);
    setOptions([...options, { id: newOptionId, option: "", isCorrect: false }]);
  };
  const handleReset = () => {
    setQuestion("");
    setVideoId("");
    setOptions([{ id: "1", option: "", isCorrect: false }]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Quiz"
    >
      <h2 className="text-slate-400 text-center font-bold text-xl">Add Quiz</h2>
      <CloseModal onRequestClose={onRequestClose} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 text-black w-[40vw] max-h-[80vh]">
          <div className="col-span-2">
            <label className="block text-slate-400 font-bold mb-2">
              Question:
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
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
              onChange={(event) => setVideoId(event.target.value)}
              required
            >
              <option defaultValue={"select videos.."}>Select option</option>
              {videos?.map((video) => (
                <option
                  key={video.id}
                  value={video.id}
                  name={video.title}
                  className="w-full px-4 py-2 border rounded-lg bg-slate-300 h-62"
                >
                  {video.title}
                </option>
              ))}
            </select>
          </div>

          {options.map((option) => (
            <div className="gap-4 col-span-2" key={option.id}>
              <label
                className="block text-slate-400 font-bold mb-2"
                htmlFor={`option${option.id}`}
              >
                Option {option.id}:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-slate-300"
                type="text"
                id={`option${option.id}`}
                name={`option${option.id}`}
                value={option.text}
                onChange={(event) => {
                  const newOptions = options.map((o) => {
                    if (o.id === option.id) {
                      return { ...o, option: event.target.value };
                    }
                    return o;
                  });
                  setOptions(newOptions);
                }}
                required
              />
              <input
                className="mr-2 leading-tight"
                type="radio"
                id={`correctOption${option.id}`}
                name="correctOption"
                value={option.id}
                checked={option.isCorrect}
                onChange={() => handleOptionChange(option.id)}
                required
              />
              <label
                className="text-slate-400 font-bold mb-2"
                // htmlFor={`correctOption${option.id}`}
              >
                isCorrect
              </label>
            </div>
          ))}

          <div className="flex space-around ">
            <button
              type="submit"
              className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline"
            >
              Add Quiz
            </button>
          </div>
          <div className="flex space-around gap-2 justify-end">
            <button
              type=""
              onClick={handleAddOption}
              className="bg-[tomato] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline"
            >
              Add More Option
            </button>
            <button
              type=""
              onClick={handleReset}
              className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddQuiz;
