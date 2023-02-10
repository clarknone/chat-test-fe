import { Box, Typography, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FaTimes } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "../general/loadingButton";
import { ITopic } from "@/interface/chat";
import { useTopicDeleteMutate } from "@/hooks/chat";
import CustomSnackBar from "../general/snackbar";
import { ISnackbarProps } from "@/interface/general";

export interface IInviteModelProps extends ITopic {
  open: boolean;
  close: () => void;
}

export default function CloseChatModel(props: IInviteModelProps) {
  const { topicDeleteMutate, loading, success, error } = useTopicDeleteMutate(props.close);

  function deleteTopic() {
    topicDeleteMutate(props._id);
  }

  const snackbar: ISnackbarProps = {
    success: success ? "Topic has been deleted" : "",
    error: error?.message,
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.close}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "400px",
            border: "none",
            backgroundColor: "white",
          },
        }}
      >
        <Box>
          <Stack direction={"row"} p={"1em"} gap={"1em"} alignItems="center" justifyContent="space-between">
            <Typography textAlign="center">Close Chat</Typography>
            <IconButton onClick={props.close} sx={{ fontSize: "1.2em", color: "#000000" }}>
              <FaTimes />
            </IconButton>
          </Stack>
          <Stack gap={"1em"} p={"1em"} alignItems="flex-start" justifyContent="center">
            <Typography textAlign="center" fontSize={"1.2em"}>
              You are about to close and delete this topic
            </Typography>
            <Typography textAlign="center" fontSize={"0.8em"}>
              All messages in this topic will be deleted and can't be retrived.{" "}
            </Typography>
            <Stack mt={"1em"} direction="row" width={"100%"} justifyContent="space-between">
              <LoadingButton
                variant="contained"
                color="error"
                disableElevation
                loading={loading}
                onClick={(e) => deleteTopic()}
              >
                Delete
              </LoadingButton>
              <LoadingButton variant="contained" disableElevation loading={loading} onClick={props.close}>
                Cancel
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Dialog>

      <CustomSnackBar
        display={Boolean(snackbar.error || snackbar.success)}
        type={snackbar.success ? "success" : "error"}
        message={snackbar.error || snackbar.success}
      />
    </>
  );
}
