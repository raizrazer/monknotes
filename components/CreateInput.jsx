import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  AiOutlinePlusCircle,
  AiOutlineArrowUp,
  AiOutlineClear,
} from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import db from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateInput = ({ createInputValues }) => {
  // * Toastify function to show a toast when a user created a note.
  const notify = (value) => {
    switch (value) {
      case "success":
        toast.success("Note added successfully!");
        break;
      case "updated":
        toast.success("Note updated successfully!");
        break;
      default:
        toast("I don't know what this toast is!");
    }
  };
  const formRef = useRef();
  // * Form Focus controls state
  const [inFocus, setInFocus] = useState(false);
  // * Error control states
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  // * Input Values states
  const [titleValue, setTitleValue] = useState("");
  const [taglineValue, setTaglineValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [pinned, setPinned] = useState("");
  // * Show CREATE OR UPDATE states
  const [update, setUpdate] = useState(false);

  // * Show Error if the required input field is not filled.
  const showErrorInput = (text) => {
    return (
      <p className="text-xs mx-1 text-red-500 justify-self-end ">
        Enter {text} please
      </p>
    );
  };

  useEffect(() => {
    (() => {
      if (createInputValues != null) {
        setTitleValue(createInputValues.title);
        setTaglineValue(createInputValues.tagline);
        setBodyValue(createInputValues.body);
        setPinned(createInputValues.pinned ? true : false);
        setInFocus(true);
        setUpdate(true);
      }
    })();
  }, [createInputValues]);

  //* Add a new document with a generated id.
  const addNote = async () => {
    if (titleValue === "") {
      setTitleError(true);
      setTimeout(() => {
        setTitleError(false);
      }, 10000);
      return;
    } else if (bodyValue === "") {
      setBodyError(true);
      setTimeout(() => {
        setBodyError(false);
      }, 10000);
      return;
    } else {
      const notesRef = collection(db, "notes");
      const docRef = await addDoc(notesRef, {
        heading: titleValue,
        tagline: taglineValue ? taglineValue : "",
        notecontent: bodyValue,
        timestamp: new Date(),
      });
      setTitleValue("");
      setTaglineValue("");
      setBodyValue("");
      notify("success");
    }
  };

  const updateNote = async () => {
    if (titleValue === "") {
      setTitleError(true);
      setTimeout(() => {
        setTitleError(false);
      }, 10000);
      return;
    } else if (bodyValue === "") {
      setBodyError(true);
      setTimeout(() => {
        setBodyError(false);
      }, 10000);
      return;
    } else {
      if (pinned) {
        const notesRef = doc(db, "pinnednotes", createInputValues.id);
        await updateDoc(notesRef, {
          heading: titleValue,
          tagline: taglineValue ? taglineValue : "",
          notecontent: bodyValue,
          timestamp: new Date(),
        });
      } else {
        const notesRef = doc(db, "notes", createInputValues.id);
        await updateDoc(notesRef, {
          heading: titleValue,
          tagline: taglineValue ? taglineValue : "",
          notecontent: bodyValue,
          timestamp: new Date(),
        });
      }
      setTitleValue("");
      setTaglineValue("");
      setBodyValue("");
      notify("updated");
    }
  };
  return (
    <div className={`py-5 px-5`}>
      {/* Toast */}
      <ToastContainer draggable />
      <div className={`flex justify-center relative w-full`}>
        <div className={`${inFocus ? `fixed transition-colors duration-[300ms]  top-0 w-screen h-screen bg-gray-500 bg-opacity-50` : ``}`}>
          <form
            ref={formRef}
            onFocus={() => {
              setInFocus(true);
            }}
            onBlur={() => {
              if (titleValue === "" && bodyValue === "") {
                setUpdate(false);
                setInFocus(false);
              }
            }}
            className={`flex transition-none w-[90%] md:w-[500px] bg-card-bg flex-col static p-2 outline-black transition-all duration-500 shadow-brand-main rounded-brand-main justify-center max-w-[1000px] ${
              inFocus
                ? "outline-[1px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : ""
            }`}
          >
            <div>
              <div className="flex">
                <AiOutlinePlusCircle
                  className={`text-4xl text-brand-lite-color transition-all duration-200 ${
                    inFocus ? "w-0" : ""
                  }`}
                />
                <input
                  className="bg-inherit p-1 mx-1 w-full text-brand-maintitle text-brand-main-color-dark font-bold"
                  type={"text"}
                  placeholder="Enter a title"
                  value={titleValue}
                  onChange={(e) => {
                    setTitleError(false);
                    if (e.target.value.length < 40) {
                      setTitleValue(e.target.value);
                    }
                  }}
                ></input>
              </div>
              {titleError ? showErrorInput("title") : ""}
            </div>
            <div
              className={`flex transition-all duration-200 ${
                inFocus ? "h-fit" : "h-0 overflow-hidden"
              }`}
            >
              <input
                className="bg-inherit p-1 mx-1 w-full text-brand-subtitle text-brand-main-medium-color font-semibold"
                type={"text"}
                placeholder="Enter a tagline"
                value={taglineValue}
                onChange={(e) => {
                  if (e.target.value.length < 80) {
                    setTaglineValue(e.target.value);
                  }
                }}
              ></input>
            </div>
            <div>
              <div
                className={`flex transition-all duration-200 ${
                  inFocus ? "h-fit" : "h-0 overflow-hidden"
                }`}
              >
                <TextareaAutosize
                  className="bg-inherit p-1 mx-1 w-full h-max text-brand-body text-brand-main-color-dark items-stretch"
                  type={"text"}
                  placeholder="Enter you notes here"
                  value={bodyValue}
                  onChange={(e) => {
                    setBodyError(false);
                    setBodyValue(e.target.value);
                  }}
                ></TextareaAutosize>
              </div>
              {bodyError ? showErrorInput("some content") : ""}
            </div>
            <div
              className={`flex justify-center transition-all duration-200 ${
                inFocus ? "h-fit my-1" : "h-0 overflow-hidden"
              }`}
            >
              <button
                className="flex items-center gap-4 font-semibold rounded-md bg-brand-lite-color text-brand-main-color-dark px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  update ? updateNote() : addNote();
                }}
              >
                {update ? (
                  <AiOutlineArrowUp
                    className={`text-4xl text-brand-main-color-dark bg-brand-lite-color transition-all duration-200`}
                  />
                ) : (
                  <AiOutlinePlusCircle
                    className={`text-4xl text-brand-main-color-dark bg-brand-lite-color transition-all duration-200`}
                  />
                )}

                {update ? `Update Note` : `Create a Note`}
              </button>
              <div className="ml-2 ">
                {update ? (
                  <AiOutlineClear
                    onClick={() => {
                      setTitleValue("");
                      setTaglineValue("");
                      setBodyValue("");
                      setUpdate(false);
                      setInFocus(false);
                    }}
                    className={`text-4xl h-full rounded-md text-brand-main-color-dark bg-brand-lite-color transition-all duration-200`}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInput;
