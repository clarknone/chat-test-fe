import { ITopic } from "@/interface/chat";
import { IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import Router from "next/router";
import { useState, MouseEvent } from "react";
import { FaTimes } from "react-icons/fa";
import CloseChatModel from "../model/closeChatModel";

export default function TopicComponent(topic: ITopic) {
  const [display, setDisplay] = useState<boolean>(false);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDisplay(true);
  };
  return (
    <>
      <ListItem
        onClick={() => Router.push(`/chat/${topic._id}`)}
        style={{ cursor: "pointer" }}
        secondaryAction={
          <IconButton onClick={(e) => toggle(e)}>
            <FaTimes />
          </IconButton>
        }
      >
        <ListItemText primary={<Typography> {topic.title} </Typography>} />
      </ListItem>
      <CloseChatModel open={display} close={() => setDisplay(false)} {...topic} />
    </>
  );
}
