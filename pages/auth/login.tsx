import LoadingButton from "@/component/general/loadingButton";
import CustomSnackBar from "@/component/general/snackbar";
import { useAuthContex } from "@/context/auth";
import { ISignInData } from "@/interface/auth";
import { ISnackbarProps } from "@/interface/general";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuthContex();
  const [snackbar, setSnackbar] = useState<ISnackbarProps>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ISignInData = { email: e.currentTarget["email"].value, password: e.currentTarget["password"].value };
    setSnackbar({});
    setLoading(true);
    login &&
      login(data)
        .then(() => {
          setSnackbar(() => ({ success: "Login sucessful" }));
          router.push("/");
        })
        .catch((e) => {
          console.log({ m: e.message });
          setSnackbar(() => ({ error: e.message }));
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return (
    <Stack justifyContent={"center"} alignItems="center" sx={{ minHeight: "100vh" }}>
      <Card elevation={0}>
        <Stack p={"1em"} gap={"1em"} justifyContent="center">
          <Typography>
            {" "}
            Login to Continue or{" "}
            <Link href={"/auth/signup"}>
              <Button> Sign Up </Button>
            </Link>
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack gap={"2em"}>
              <TextField label="Email" name="email" type={"email"} />
              <TextField label="Password" name="password" type={"password"} />
              <LoadingButton variant="contained" loading={loading} type="submit">
                Login
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Card>

      <CustomSnackBar
        display={Boolean(snackbar.error || snackbar.success)}
        type={snackbar.success ? "success" : "error"}
        message={snackbar.error || snackbar.success}
      />
    </Stack>
  );
}
