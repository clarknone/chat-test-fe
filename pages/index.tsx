import { Inter } from "@next/font/google";
import { Box, Card, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@/component/general/loadingButton";
import CustomSnackBar from "@/component/general/snackbar";
import { useCreateTopicMutate, useTopicFetch } from "@/hooks/chat";
import { FormEvent } from "react";
import { ITopicForm } from "@/interface/chat";
import { ISnackbarProps } from "@/interface/general";
import { FaPlus } from "react-icons/fa";
import TopicComponent from "@/component/chat/topic";
import UserLayout from "@/layout/authlayout";

export default function Home() {
  const { createTopicMutate, loading, error, success } = useCreateTopicMutate();

  const { topics } = useTopicFetch();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: ITopicForm = {
      title: e.currentTarget["topic"].value,
    };
    console.log({ data });
    createTopicMutate(data);
  }

  const snackbar: ISnackbarProps = {
    success: success ? "Topic Added" : "",
    error: error?.message,
  };

  return (
    <UserLayout>
      <Stack justifyContent={"center"} alignItems="center" sx={{ minHeight: "100vh" }}>
        <Card elevation={0}>
        <form onSubmit={handleSubmit}>
          <Stack direction={"row"} gap="1em">
            <Box flexGrow={1}>
              <TextField fullWidth label="Enter New Topic" name="topic" />
            </Box>
            <Box>
              <LoadingButton variant="contained" startIcon={<FaPlus />} loading={loading} type="submit">
                Add
              </LoadingButton>
            </Box>
          </Stack>
        </form>
          <Stack p={"1em"} gap={"1em"} justifyContent="center">
            {topics?.length ? (
              <>
                {topics.map((topic) => (
                  <TopicComponent key={topic._id} {...topic} />
                ))}
              </>
            ) : (
              <>
                <Typography> No Topic </Typography>
              </>
            )}
          </Stack>
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
