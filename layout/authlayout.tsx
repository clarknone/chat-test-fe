import { AppBar, Container, IconButton, Stack, Typography } from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContex } from "@/context/auth";
import { FaChevronCircleLeft, FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";

export default function UserLayout({ children }: PropsWithChildren) {
  const { auth, logout } = useAuthContex();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!auth?.token) {
      router.push("/auth/login");
    }
  }, [auth]);

  return auth?.token ? (
    <Container
      sx={{
        bgcolor: "#F5F5F5",
      }}
      disableGutters
      maxWidth={false}
    >
      <AppBar elevation={0}>
        <Stack
          alignItems={"center"}
          sx={{ p: "0.5em", color: "white" }}
          direction={"row"}
          justifyContent="space-between"
        >
          <Stack direction={"row"} alignItems="center" gap="0.8em">
            <IconButton onClick={goBack}>
              <FaChevronCircleLeft color="white" />
            </IconButton>
            <Typography fontSize={"1.2em"} variant="h3">
              Chat System
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconButton onClick={logout}>
              <AiOutlineLogout color="white" />
            </IconButton>
            <Link href="/profile">
              <IconButton>
                <FaUser color="white" />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
      </AppBar>
      {children}
    </Container>
  ) : (
    <></>
  );
}
