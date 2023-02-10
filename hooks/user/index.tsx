
import { ICallback } from "@/interface/general";
import { IUser } from "@/interface/user";
import { editProfileAPI, getProfileAPI } from "@/service/api/user/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useProfileFetch() {
  const { data, isLoading, error } = useQuery(["profile"], getProfileAPI);
  return { user: data, loading: isLoading, error };
}

export function useProfileMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: FormData) => {
      return editProfileAPI(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
        callback && callback();
      },
    }
  );
  const e = error as Error;

  return {
    profileMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error: { message: e?.message },
    isError,
  };
}
