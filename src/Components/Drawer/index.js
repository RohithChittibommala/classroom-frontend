import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookIcon from "@mui/icons-material/Book";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useAppState } from "../../state";

export default function TemporaryDrawer(props) {
  const { handleOpenDrawer, open } = props;

  const { state } = useAppState();

  const { pathname } = useLocation();

  const toggleDrawer = () => {
    handleOpenDrawer();
  };

  const sx = {
    color: "#007FFF",
    fontSize: "18px",
  };

  const drawerOptions = [
    {
      text: "Home",
      icon: <HomeIcon sx={sx} />,
      link: "/",
    },

    {
      text: "Courses",
      icon: <BookIcon sx={sx} />,
      link: "/approved",
      role: "student",
    },
    {
      text: "Instructors",
      icon: <PersonIcon sx={sx} />,
      link: "/instructors",
      role: "admin",
    },
    {
      text: "Pending",
      icon: <HourglassFullIcon sx={sx} />,
      link: "/pending",
      role: "instructor",
    },
    {
      text: "Pending",
      icon: <HourglassFullIcon sx={sx} />,
      link: "/pending",
      role: "admin",
    },
  ].filter((option) => (option.role ? option.role === state.role : true));

  const list = () => (
    <Box
      sx={{ width: 250, padding: "10px" }}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {drawerOptions.map(({ text, icon, link }) => (
          <CustomLink to={link} key={text}>
            <CustomListItem button active={(pathname === link).toString()}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </CustomListItem>
          </CustomLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
      {list()}
    </Drawer>
  );
}

const CustomLink = styled(Link)`
  text-decoration: none;
  color: #444;
`;

const CustomListItem = styled(ListItem)`
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  font-size: 14px;

  ${({ active }) => {
    if (active === "true") {
      return `
        background-color: #f0f7ff;
        color: #007FFF;

        &:hover {
            background-color: #f0f7ff;
        }

        `;
    }
  }}
`;
