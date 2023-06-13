import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import NoteItem from "./NoteItem";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {notes.length === 0 && (
        <Typography textAlign={"center"}>
          You dont have any notes at the moment
        </Typography>
      )}
      <Box
        gap={3}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "33% 33% 33%",
            sm: "50% 50%",
            xs: "100%",
          },
        }}
      >
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} />;
        })}
      </Box>
    </div>
  );
};

export default Notes;
