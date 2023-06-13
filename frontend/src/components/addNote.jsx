import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import { useState } from "react";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    setNoteDetails({ ...noteDetails, [e.target.name]: e.target.value });
  };
  const handleAddNote = (e) => {
    addNote(noteDetails);
    setNoteDetails({
      title: "",
      description: "",
    });
  };
  return (
    <Box>
      <Typography fontWeight={300} variant="h4" mt={3} mb={3} align="center">
        Add a Note
      </Typography>
      <TextField
        name="title"
        id="title"
        onChange={handleChange}
        margin="normal"
        fullWidth
        label="Enter Title"
        variant="standard"
        value={noteDetails.title}
      />
      <TextField
        name="description"
        id="description"
        onChange={handleChange}
        margin="normal"
        fullWidth
        label="Enter Description"
        multiline
        rows={4}
        variant="standard"
        value={noteDetails.description}
      />
      <Button
        sx={{ margin: "10px 0" }}
        size="large"
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        onClick={handleAddNote}
        disabled={
          noteDetails.title.length === 0 || noteDetails.description.length === 0
        }
      >
        Add
      </Button>
    </Box>
  );
};

export default AddNote;
