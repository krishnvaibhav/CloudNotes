import { Container } from "@mui/material";
import React from "react";
import Notes from "./notes";
import AddNote from "./addNote";
export default function Home() {
  return (
    <Container>
      <AddNote />
      <Notes />
    </Container>
  );
}
