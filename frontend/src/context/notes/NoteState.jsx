import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const url = `${host}/api/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (note) => {
    const url = `${host}/api/notes/AddNotes`;
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
      }),
    });
    const json = response.json();
    setNotes(
      notes.concat({
        title: note.title,
        description: note.description,
      })
    );
    console.log(notes);
  };
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    let newNote = notes.filter((note) => note._id !== id);
    setNotes(newNote);
  };
  const updateNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updateNote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    console.log(newNotes);

    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, updateNote, addNote, deleteNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
