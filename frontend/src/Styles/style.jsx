import styled from "@emotion/styled";
import { Link } from "@mui/material";

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.otherColor.main,
  "&:hover": {
    opacity: "0.7",
    textDecoration: "none",
  },
}));
