import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { PropsWithChildren } from "react";

interface ILoadingButtonProps extends PropsWithChildren, ButtonProps {
  loading?: boolean;
}

export default function LoadingButton(props: ILoadingButtonProps) {
  return (
    <Button {...props} disabled={props.loading ? true : false}>
      {!props.loading ? (
        props.children
      ) : (
        <>
          <CircularProgress variant="indeterminate" />
        </>
      )}
    </Button>
  );
}
