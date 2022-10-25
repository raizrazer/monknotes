import React from "react";
import { doc,setDoc, deleteDoc } from "firebase/firestore";
import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlinePushpin,
} from "react-icons/ai";
import db from "../utils/firebase";

const NoteItem = ({
  id,
  title,
  tagline,
  body,
  timestamp,
  getCreateInputData,
  pinned,
}) => {
  const dateAndTime = new Date(timestamp.seconds * 1000);
  // * Function Deleting a Note from the Firebase Firestore.
  const deleteNote = async () => {
    if(pinned){
      await deleteDoc(doc(db, "pinnednotes", id.toString()));
    }
    else{
      await deleteDoc(doc(db, "notes", id.toString()));
    }
  };
  const addPinNote = async() =>{
    const notesRef = doc(db, "pinnednotes", id.toString());
    await setDoc(notesRef, {
      heading: title,
      tagline: tagline ? tagline : "",
      notecontent: body,
      timestamp: timestamp,
    });
  }
  const addNote = async() =>{
    const notesRef = doc(db, "notes", id.toString());
    await setDoc(notesRef, {
      heading: title,
      tagline: tagline ? tagline : "",
      notecontent: body,
      timestamp: timestamp,
    });
  }
  const pinNote = async () => {
    if(pinned){
      deleteNote();
      addNote();
    }
    else{
      addPinNote();
      await deleteDoc(doc(db, "notes", id.toString()));
    }
  };

  return (
    <article
      onClick={(e) => {
        e.preventDefault();
        console.log(e.target.id)
        // class content
        if (e.target.id === "selectable") {
          getCreateInputData({ id, title, tagline, body, pinned });
        }
      }}
      className="content bg-card-bg transition-all duration-250 hover:outline hover:outline-[1px] outline-black flex flex-col gap-y-[6px] w-[250px] py-[30px] px-[20px] h-fit rounded-brand-main shadow-brand-main"
    >
      <div id="selectable" className="flex w-full justify-between mb-2 text-2xl text-brand-biggest text-brand-lite-color  ">
        <AiOutlinePushpin
          id="button"
          onClick={(e) => {
            e.preventDefault();
            pinNote();
          }}
          className="cursor-pointer transition-all duration-100 ease-in-out hover:rotate-90 hover:scale-[130%]"
        />
        <AiOutlineDelete
          id="button"
          onClick={(e) => {
            e.preventDefault();
            deleteNote();
          }}
          className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-[130%]"
        />
      </div>
      <div className="flex items-center justify-between text-brand-maintitle font-bold w-full">
        <h3 id="selectable" className="text-brand-main-color-dark ">{title}</h3>
      </div>
      {tagline && (
        <h4 id="selectable" className="text-brand-subtitle text-brand-main-medium-color overflow-clip  font-semibold">
          {tagline}
        </h4>
      )}
      <p id="selectable" className="text-brand-body items-stretch text-brand-main-low-dark overflow-clip ">
        {body}
      </p>
      <p className="date self-end text-brand-body text-brand-lite-color  flex items-center">
        <AiOutlineCalendar className=" text-brand-biggest " />
        {dateAndTime.toLocaleTimeString("default")}{" "}
        {dateAndTime.toLocaleDateString("default")}
      </p>
    </article>
  );
};

export default NoteItem;
