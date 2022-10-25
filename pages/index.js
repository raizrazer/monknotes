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
import useLocalStorage from "../utils/uselocalstorage";
import Head from "next/head";

export default function Home() {
  // * Simple MadeUp Theme'ing
  const [theme, setTheme] = useLocalStorage("theme");
  const [themeValue, setThemeValue] = useState();
  useEffect(() => {
    if (theme === undefined) {
      setTheme("light");
      setThemeValue("light");
    } else {
      setThemeValue(theme);
    }
  }, []);

  // * Simple theme switcher
  const switchTheme = () => {
    setThemeValue(theme === "dark" ? "light" : "dark");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // * To store the value of the current page
  const [currentPage, setCurrentPage] = useState(0);
  // * Notes List fetching from firebase firestore
  const [notesList, setNotesList] = useState();
  const [notesLength, setNotesLength] = useState();
  // * Pinned Notes List fetching from firebase firestore
  const [pinnedNotesList, setPinnedNotesList] = useState();
  const [pinnedNotesLength, setPinnedNotesLength] = useState();
  // * To store the values of the clicked notes and to display it on the create input fields
  const [createInputValues, setCreateInputValues] = useState();

  // * Toastify Section
  const notify = (value) => {
    switch (value) {
      case "error":
        toast.error("Loading data had some issues, please refresh/reload");
        break;
      default:
        toast("I don't know what this toast is!");
    }
  };
  // * Getting the notes and setting it to the state
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
            notify("error");
          }
        );
        setNotesList(notes);
        setNotesLength(notes.length);
      });
    };
    getNotes();
    const getPinnedNotes = () => {
      const notesRef = collection(db, "pinnednotes");
      const q = query(notesRef, orderBy("timestamp"));
      const unsub = onSnapshot(q, (docs) => {
        const pinnedNotes = [];
        docs.forEach(
          (doc) => {
            pinnedNotes.push(doc);
          },
          (error) => {
            notify("error");
          }
        );
        setPinnedNotesList(pinnedNotes);
        setPinnedNotesLength(pinnedNotes.length);
      });
    };
    getPinnedNotes();
  }, []);

  // * The number of notes per page
  const notesPerPage = 6;

  // * Function that displays the Notes
  const displayNote = () => {
    if (notesList) {
      const visitedPage = currentPage * notesPerPage;
      const vistedPageLast = visitedPage + notesPerPage;
      return notesList.slice(visitedPage, vistedPageLast).map((note, index) => {
        return (
          <NoteItem
            key={index}
            id={note.id}
            title={note.data().heading}
            tagline={note.data().tagline}
            body={note.data().notecontent}
            timestamp={note.data().timestamp}
            getCreateInputData={getCreateInputData}
          />
        );
      });
    } else {
      return (
        <Grid
          height="80"
          width="80"
          color="var(--brand-lite-color)"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      );
    }
  };

  // * Function that displays the pinnedNotes
  const displayPinnedNote = () => {
    if (pinnedNotesList) {
      return pinnedNotesList.map((note, index) => {
        return (
          <NoteItem
            key={index}
            id={note.id}
            title={note.data().heading}
            tagline={note.data().tagline}
            body={note.data().notecontent}
            timestamp={note.data().timestamp}
            getCreateInputData={getCreateInputData}
            pinned={true}
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
  // * Page change action function
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // * Function to get the content to show in the CreateInput
  const getCreateInputData = (dataFields) => {
    setCreateInputValues(dataFields);
  };

  return (
    <div className="main z-0 overflow-hidden" data-theme={themeValue}>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="DaRudeMonkie" />
        <meta
          name="description"
          content="This Application is used to store simple notes, It's also public. It's an app made with NextJS and Google Firebase."
        />
        <title>MonkNotes</title>
      </Head>
      <DarkModeSelector switchTheme={switchTheme} />
      <div className="max-w-[1200px] relative overflow-hidden mx-auto">
        {/* * Navbar / Just Header */}
        <Navbar />
        {/* DarkMode */}
        {/* Create a new Note */}
        <CreateInput createInputValues={createInputValues} />
        {/* Pinned Note Section */}
        <div className={`mb-5 ${pinnedNotesLength ? `` : `hidden`}`}>
          <h1 className="flex mb-5 items-center text-brand-biggest text-brand-main-color-dark font-semibold px-3 md:px-10">
            {" "}
            <BiNote /> Pinned Notes
          </h1>
          <div className="flex justify-center px-10 lg:px-0">
            <div
              className={`${
                notesList ? `grid` : `flex`
              } flex-wrap gap-[30px] justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
            >
              {displayPinnedNote()}
            </div>
          </div>
        </div>
        {/* Main Notes Section Displayed */}
        <div className="mb-5">
          <h1 className="flex mb-5 items-center text-brand-biggest text-brand-main-color-dark font-semibold px-3 md:px-10">
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
        <Pagination
          notesPerPage={notesPerPage}
          currentPage={currentPage}
          totalNotes={notesLength}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
