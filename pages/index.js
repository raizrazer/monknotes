import CreateInput from "../components/CreateInput";
import DarkModeSelector from "../components/DarkModeSelector";
import Navbar from "../components/Navbar";
import { BiNote } from "react-icons/bi";
import NoteItem from "../components/NoteItem";
import Pagination from "../components/Pagination";
import db from "../utils/firebase";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Grid } from "react-loader-spinner";

export default function Home() {
  const notify = (value) => {
    switch (value) {
      case "error":
        toast.error("Loading data had some issues, please refresh/reload");
        break;
      default:
        toast("I don't know what this toast is!");
    }
  };

  const [notesList, setNotesList] = useState();
  useEffect(() => {
    const getNotes = () => {
      const notesRef = collection(db, "notes");
      const q = query(notesRef, orderBy("timestamp"));
      const unsub = onSnapshot(q, (docs) => {
        const notes = [];
        docs.forEach(
          (doc) => {
            notes.push(doc);
          },
          (error) => {
            console.log(error);
            notify("error");
          }
        );
        setNotesList(notes);
      });
    };
    getNotes();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const notesPerPage = 6;
  const visitedPage = currentPage * notesPerPage;
  const visitedPageEnd = visitedPage + notesPerPage;

  const displayNote = () => {
    if (notesList) {
      // notesList.splice(visitedPage,visitedPageEnd);
      return notesList
        .splice(visitedPage, visitedPageEnd)
        .map((note, index) => {
          return (
            <NoteItem
              key={index}
              id={note.id}
              title={note.data().heading}
              tagline={note.data().tagline}
              body={note.data().notecontent}
              timestamp={note.data().timestamp}
            />
          );
        });
    } else {
      return (
        <Grid
          height="80"
          width="80"
          color="gray"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      );
    }
  };

  return (
    <div className="main max-w-[1200px] mx-auto">
      {/* * Navbar / Just Header */}
      <Navbar />
      {/* DarkMode */}
      <DarkModeSelector />
      {/* Create a new Note */}
      <CreateInput />
      {/* Pinned Note Section */}
      {/* Main Notes Section Displayed */}
      <div>
        <h1 className="flex items-center text-brand-biggest font-semibold px-3 md:px-10">
          {" "}
          <BiNote /> Notes
        </h1>
        <div className="flex justify-center px-10 lg:px-0">
          <div
            className={`${
              notesList ? `grid` : `flex`
            } flex-wrap gap-[30px] justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
          >
            {displayNote()}
          </div>
        </div>
      </div>
      {/* Pagination */}
      {notesList && <Pagination notesPerPage={notesPerPage} totalNotes={notesList.length} />}
    </div>
  );
}
