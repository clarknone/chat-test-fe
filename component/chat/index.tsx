import { IChat } from "@/interface/chat";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

function ImageDisplay(chat: IChat) {
  return (
    <Box width={"100%"} maxWidth="400px">
      <img width={"100%"} src={chat.file?.url} />
    </Box>
  );
}
function FileDisplay(chat: IChat) {
  return (
    <Box width={"100%"} maxWidth="400px">
      <a style={{ textDecoration: "none", color: "inherit" }} href={chat.file?.url} download>
        {chat.message} <Chip label={chat.file?.format} size="small" sx={{ fontSize: "0.7em" }} />
      </a>
    </Box>
  );
}

export default function ChatComponent(chat: IChat) {
  return (
    <Box bgcolor="white" px={"0.8em"} py={"0.5em"}>
      <Stack direction="row">
        <Typography fontSize={"0.8em"}> {chat.user?.fullname || chat.invite?.fullname} </Typography>
        <Chip label={!chat.user ? "external" : "user"} size="small" color={!chat.user ? "secondary" : "primary"} />
      </Stack>
      {chat.file ? (
        ["svg", "jpg", "png", "jpeg"].includes(chat.file?.format || "") ? (
          <ImageDisplay {...chat} />
        ) : (
          <FileDisplay {...chat} />
        )
      ) : (
        <Typography> {chat.message} </Typography>
      )}
    </Box>
  );
}
