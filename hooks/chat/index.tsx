import { IChatFilter, IInvite, IInviteForm, ITopic, ITopicForm } from "@/interface/chat";
import { ICallback } from "@/interface/general";
import { createInviteAPI, createTopicAPI, deleteTopicAPI, getChatAPI, getTopicAPI } from "@/service/api/chat/user";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChatFetch(filter: IChatFilter) {
  const { data, isLoading, error } = useQuery(
    ["chats", filter],
    () => {
      return getChatAPI(filter);
    },
    { refetchOnMount: false }
  );
  return { chats: data, loading: isLoading, error };
}

export function useTopicFetch() {
  const { data, isLoading, error } = useQuery(
    ["topics"],
    () => {
      return getTopicAPI();
    },
    { refetchOnMount: false }
  );
  return { topics: data, loading: isLoading, error };
}

export function useCreateTopicMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: ITopicForm) => {
      return createTopicAPI(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["topics"]);
        callback && callback();
      },
    }
  );
  const e = error as Error;

  return {
    createTopicMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error: { message: e?.message },
    isError,
  };
}
export function useTopicDeleteMutate(callback?: ICallback) {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (id: string) => {
      return deleteTopicAPI(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["topics"]);
        callback && callback();
      },
    }
  );
  const e = error as Error;

  return {
    topicDeleteMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error: { message: e?.message },
    isError,
  };
}

export function useInviteMutate(callback?: ICallback) {
  const { isLoading, mutate, error, isSuccess, isError } = useMutation(
    (data: IInviteForm) => {
      return createInviteAPI(data);
    },
    {
      onSuccess: () => {
        callback && callback();
      },
    }
  );
  const e = error as Error;

  return {
    createInviteMutate: mutate,
    loading: isLoading,
    success: isSuccess,
    error: { message: e?.message },

    isError,
  };
}
