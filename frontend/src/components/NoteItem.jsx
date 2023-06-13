import {
  Box,
  Button,
  Card,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
  checkboxClasses,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const NoteItem = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: 400, sm: "70%" },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const note = props.note;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [noteDetails, setNoteDetails] = useState({
    title: note.title,
    description: note.description,
  });
  const handleChange = (e) => {
    setNoteDetails({ ...noteDetails, [e.target.name]: e.target.value });
  };

  const context = useContext(noteContext);
  const { deleteNote, updateNote } = context;

  const handleUpdateNote = () => {
    updateNote(note._id, noteDetails.title, noteDetails.description);
    setOpen(false);
  };

  return (
    <Card
      sx={{
        padding: "10px",
        margin: "10px 0",
      }}
      variant="outlined"
    >
      <Stack direction={"column"} spacing={2} padding={"20px 20px 0 20px"}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              required
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
              required
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
              onClick={handleUpdateNote}
              endIcon={<CheckCircleOutlineIcon />}
            >
              Confirm
            </Button>
          </Box>
        </Modal>
        <Typography
          variant="h5"
          color="primary"
          align="center"
          sx={{ marginBottom: "10px" }}
        >
          {note.title}
        </Typography>
        <Divider sx={{ marginBottom: "10px" }} />
        <Typography
          paragraph
          align="left"
          sx={{ marginBottom: "10px", wordWrap: "break-word" }}
        >
          {note.description}
        </Typography>
        <Typography
          justifyContent={"end"}
          variant="caption"
          color="textSecondary"
        >
          {note.date}
        </Typography>
        <Divider />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button
            onClick={() => {
              handleOpen();
            }}
          >
            <EditIcon color="primary" />
          </Button>
          <Button
            onClick={() => {
              deleteNote(note._id);
            }}
          >
            <DeleteIcon sx={{ color: "primary" }} />
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default NoteItem;
