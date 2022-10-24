import React from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import {AiOutlineCalendar,AiOutlineDelete} from "react-icons/ai"
import db from '../utils/firebase';

const NoteItem = ({id,title,tagline,body,timestamp}) => {
  const dateAndTime = new Date(timestamp.seconds*1000);
  const deleteNote = async() =>{
    await deleteDoc(doc(db, "notes", id.toString() ));
  }
  return (
    <article onClick={()=>{console.log("Clicked",{id,title})}} className="content transition-[outline] duration-50 hover:outline hover:outline-[1px] outline-black flex flex-col gap-y-[6px] w-[250px] py-[30px] px-[20px] h-fit rounded-brand-main shadow-brand-main">
          <div className="flex items-center justify-between text-brand-maintitle font-bold w-full"><h3 className='overflow-clip '>{title}</h3><AiOutlineDelete onClick={(e)=>{e.preventDefault(); deleteNote();}} className='text-brand-biggest w-[40px] cursor-pointer'/></div>
          {tagline && <h5 className="text-brand-subtitle  overflow-clip  font-semibold">{tagline}</h5> }
          <p className="text-brand-body items-stretch overflow-clip ">{body}</p>
          <p className="date self-end text-brand-body flex items-center"><AiOutlineCalendar className=" text-brand-biggest "/>{dateAndTime.toLocaleTimeString("default")} {dateAndTime.toLocaleDateString("default")}</p>
    </article>
  )
}

export default NoteItem