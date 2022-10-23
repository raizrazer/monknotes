import React from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import {AiOutlineCalendar,AiOutlineDelete} from "react-icons/ai"
import db from '../utils/firebase';

const NoteItem = ({id,title,tagline,body,timestamp}) => {
  const dateAndTime = new Date(timestamp.seconds*1000);
  const deleteNote = async() =>{
    console.log(doc);
    await deleteDoc(doc(db, "notes", id.toString() ));
  }
  return (
    <article className="content flex flex-col gap-y-[6px] w-[250px] py-[30px] px-[20px] h-fit rounded-brand-main shadow-brand-main">
          <h3 className="flex items-center justify-between text-brand-maintitle font-bold w-full">{title}<AiOutlineDelete onClick={(e)=>{e.preventDefault(); deleteNote();}} className='text-brand-biggest cursor-pointer'/></h3>
          {tagline && <h5 className="text-brand-subtitle font-semibold">{tagline}</h5> }
          <p className="text-brand-body items-stretch ">{body}</p>
          <p className="date self-end text-brand-body flex items-center"><AiOutlineCalendar className=" text-brand-biggest "/>{dateAndTime.toLocaleTimeString("default")} {dateAndTime.toLocaleDateString("default")}</p>
    </article>
  )
}

export default NoteItem