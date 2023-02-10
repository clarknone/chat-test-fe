import { Inter } from "@next/font/google";
import { Avatar, Box, Card, IconButton, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@/component/general/loadingButton";
import CustomSnackBar from "@/component/general/snackbar";
import { FormEvent, useState } from "react";
import { IUser, IUserForm } from "@/interface/user";
import { useProfileFetch, useProfileMutate } from "@/hooks/user";
import { ISnackbarProps } from "@/interface/general";
import { FaCamera } from "react-icons/fa";
import UserLayout from "@/layout/authlayout";

export default function ProfilePage() {
  const { profileMutate, loading, error, success } = useProfileMutate();
  const { user } = useProfileFetch();
  const [file, setFile] = useState<File>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: IUserForm = {
      fullname: e.currentTarget["fullname"].value,
      avatar: e.currentTarget["avatar"].files[0],
    };
    const formData = new FormData();

    formData.append("fullname", data.fullname);
    data.avatar && formData.append("avatar", data.avatar);
    profileMutate(formData);
  }

  const snackbar: ISnackbarProps = {
    success: success ? "Profile Updated" : "",
    error: error?.message,
  };

  console.log({ user });

  return (
    <UserLayout>
      <Stack justifyContent={"center"} alignItems="center" sx={{ minHeight: "100vh" }}>
        <Card sx={{ width: "100%", maxWidth: "400px" }} elevation={0}>
          <form onSubmit={handleSubmit}>
            <Stack p={"1em"} gap={"1em"} alignItems="center" justifyContent="center">
              <Stack direction="row" justifyContent={"center"} alignItems={"flex-end"}>
                <Avatar
                  src={file ? URL.createObjectURL(file) : user?.avatar}
                  sx={{ width: 154, height: 154 }}
                  style={{ border: "0.5em solid #000" }}
                />
                <Box ml={"-2em"}>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input
                      onChange={(e) => setFile(e.target.files?.[0])}
                      hidden
                      accept="image/*"
                      name="avatar"
                      type="file"
                    />
                    <FaCamera />
                  </IconButton>
                </Box>
              </Stack>
              <Typography> {user?.email} </Typography>
              <TextField
                fullWidth
                label="Fullname"
                defaultValue={user?.fullname}
                key={user?.fullname}
                name="fullname"
              />
              <Box>
                <LoadingButton variant="contained" loading={loading} type="submit">
                  Save
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </Card>

        <CustomSnackBar
          display={Boolean(snackbar.error || snackbar.success)}
          type={snackbar.success ? "success" : "error"}
          message={snackbar.error || snackbar.success}
        />
      </Stack>
    </UserLayout>
  );
}
