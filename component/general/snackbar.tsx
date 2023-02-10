import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

interface ISnackBarProbs {
  display: boolean;
  message?: string;
  type: "error" | "success";
}

export default function CustomSnackBar({ display = false, message, type }: ISnackBarProbs) {
  const [open, setOpen] = useState(Boolean(display));

  useEffect(() => {
    setOpen(display);
  }, [display]);

  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Alert severity={type || "error"}> {message || "Operation failed"} </Alert>
    </Snackbar>
  );
}
