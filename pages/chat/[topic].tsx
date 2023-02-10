import { AppBar, Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@/component/general/loadingButton";
import { IChat, IChatForm } from "@/interface/chat";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useChatFetch } from "@/hooks/chat";
import ChatComponent from "@/component/chat";
import io, { Socket } from "socket.io-client";
import { useAuthContex } from "@/context/auth";
import { WS_URL } from "@/service/data";
import { FaCamera, FaChevronCircleLeft, FaDochub, FaFile, FaFilePdf, FaTimes, FaVideo } from "react-icons/fa";
import { uploadFileAPI } from "@/service/api/chat/user";
import InviteModel from "@/component/model/inviteModel";

let socket: Socket | undefined;

export default function ProfilePage() {
  const router = useRouter();
  const { auth } = useAuthContex();

  const chatBoxRef = useRef<HTMLElement>();
  const { topic, invite } = router.query;
  const [allChat, setAllChat] = useState<IChat[]>([]);

  const [inviteModel, setIniviteModel] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!topic) {
      return;
    }
    const newSocket = io(WS_URL, { query: { topic } });
    socket = newSocket;
    newSocket.on("message", (data) => {
      setAllChat((val) => [...val, data]);
    });
    // return () => {
    //   newSocket && newSocket.close();
    // };
  }, []);

  const topicFilter = topic ? (topic as string) : "";
  const { chats, loading } = useChatFetch({ topic: topicFilter });

  useEffect(() => {
    setAllChat((val) => (chats ? [...chats] : val));
  }, [chats?.length]);

  function handleChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: IChatForm = {
      message: e.currentTarget["message"].value,
      invite: invite as string,
      topic: topicFilter,
      user: auth?.id,
    };
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      return uploadFileAPI(formData)
        .then((resp) => {
          data.file = resp._id;
          console.log({ resp });
          setFile(undefined);
          // e.currentTarget.reset();
          return socket && socket?.emit("message", data);
        })
        .catch((e) => console.log({ e }));
    }
    console.log({ data, socket });
    socket && socket?.emit("message", data);
    e.currentTarget.reset();
  }

  useEffect(() => {
    if (chatBoxRef.current) {
      const element: HTMLElement = chatBoxRef.current;
      element.scrollTop = element.scrollHeight;
      element.scrollTo(0, element.scrollHeight);
    }
  }, [allChat.length]);

  const goBack = () => {
    router.back();
  };

  return (
    <Stack justifyContent={"center"} alignItems="center" sx={{ minHeight: "100vh" }}>
      <AppBar elevation={0} position="relative" color="primary" sx={{ height: "60px", color: "white" }}>
        <Stack alignItems={"center"} justifyContent="space-between" height="100%" gap="1em" direction={"row"}>
          <Stack alignItems={"center"} gap="0.5em" direction={"row"}>
            <IconButton sx={{ color: "white" }} onClick={goBack}>
              <FaChevronCircleLeft color="inherit" />
            </IconButton>
            <Typography fontSize={"1.2em"} variant="h3">
              {" "}
              Chat{" "}
            </Typography>
          </Stack>

          {auth?.token ? (
            <Button variant="contained" color="secondary" onClick={() => setIniviteModel(true)}>
              Invite
            </Button>
          ) : (
            <></>
          )}
        </Stack>
      </AppBar>
      <Box height={"calc(100vh - 120px)"} p={"1em"} ref={chatBoxRef} width="100%" overflow="scroll">
        {allChat?.length ? (
          <Stack gap="0.5em" width="100%">
            {allChat.map((chat) => (
              <Box
                alignSelf={
                  (auth?.id == chat.user?._id && auth?.id) || (invite == chat.invite?._id && invite != null)
                    ? "flex-end"
                    : "flex-start"
                }
              >
                <ChatComponent key={chat._id} {...chat} />
              </Box>
            ))}
          </Stack>
        ) : (
          <>
            <Typography> No Chats </Typography>
          </>
        )}
      </Box>
      <AppBar position="relative" color="transparent" elevation={1} sx={{ height: "60px", top: "auto", bottom: 0 }}>
        <form onSubmit={handleChat}>
          <Stack direction={"row"}>
            <Stack mr={"1em"} gap="0.5em" direction="row">
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input onChange={(e) => setFile(e.target.files?.[0])} hidden accept="image/*" name="file" type="file" />
                <FaCamera />
              </IconButton>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input onChange={(e) => setFile(e.target.files?.[0])} hidden accept="video/*" name="file" type="file" />
                <FaVideo />
              </IconButton>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input
                  onChange={(e) => setFile(e.target.files?.[0])}
                  hidden
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                  text/plain, application/pdf"
                  name="file"
                  type="file"
                />
                <FaFilePdf />
              </IconButton>
            </Stack>
            <Box flexGrow={1}>
              <TextField
                fullWidth
                label="Enter Message"
                variant="standard"
                InputProps={{
                  endAdornment: Boolean(file) && (
                    <IconButton onClick={() => setFile(undefined)}>
                      <FaTimes />
                    </IconButton>
                  ),
                }}
                defaultValue={file?.name}
                key={file?.name}
                disabled={Boolean(file)}
                name="message"
              />
            </Box>

            <LoadingButton sx={{ borderRadius: 0 }} variant="contained" loading={loading} type="submit">
              Add
            </LoadingButton>
          </Stack>
        </form>
      </AppBar>

      <InviteModel open={inviteModel} close={() => setIniviteModel(false)} topic={topicFilter} />
    </Stack>
  );
}
