import { Box, Typography, TextField, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FaTimes } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { FormEvent } from "react";
import LoadingButton from "../general/loadingButton";
import { IInvite, IInviteForm, ITopic } from "@/interface/chat";
import { useInviteMutate } from "@/hooks/chat";
import { ISnackbarProps } from "@/interface/general";
import CustomSnackBar from "../general/snackbar";

export interface IInviteModelProps {
  open: boolean;
  topic: string;
  close: () => void;
}

export default function InviteModel(props: IInviteModelProps) {
  const { createInviteMutate, loading, error, success } = useInviteMutate(props.close);

  function handleInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: IInviteForm = {
      email: e.currentTarget["email"].value,
      fullname: e.currentTarget["fullname"].value,
      topic: props.topic,
    };
    console.log({ data });
    createInviteMutate(data);
  }

  const snackbar: ISnackbarProps = {
    success: success ? "Invitation has been sent" : "",
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
            <Typography textAlign="center">Invite User</Typography>
            <IconButton onClick={props.close} sx={{ fontSize: "1.2em", color: "#000000" }}>
              <FaTimes />
            </IconButton>
          </Stack>
          <Stack gap={"1em"} p={"1em"} alignItems="flex-start" justifyContent="center">
            <form style={{ width: "100%" }} onSubmit={handleInvite}>
              <Stack gap="1em" alignItems="flex-start" justifyContent="center">
                <TextField fullWidth label="Email" name="email" type={"email"} required />
                <TextField fullWidth label="Fullname" name="fullname" required />
              </Stack>
              <Stack mt={"1em"} direction="row" justifyContent="right">
                <LoadingButton variant="contained" disableElevation loading={loading} type="submit">
                  Invite
                </LoadingButton>
              </Stack>
            </form>
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
