import { IChat, IChatFile, IChatFilter, IInvite, IInviteForm, ITopic, ITopicForm } from "@/interface/chat";
import axios from "axios";

export async function getChatAPI(filter: IChatFilter): Promise<IChat[]> {
  console.log({ filter });
  return axios
    .get("/chat", { params: filter })
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get chats");
    });
}

export async function getTopicAPI(): Promise<ITopic[]> {
  return axios
    .get("/chat/topic")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get topics");
    });
}

export async function createTopicAPI(data: ITopicForm) {
  return axios
    .post("/chat/topic", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to create topic");
    });
}

export async function createInviteAPI(data: IInviteForm) {
  return axios
    .post("/chat/invite", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to create invite");
    });
}

export async function uploadFileAPI(data: FormData): Promise<IChatFile> {
  return axios
    .post("/chat/file/upload", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to uplaod file");
    });
}

export async function deleteTopicAPI(topicId: string) {
  return axios
    .delete(`/chat/topic/${topicId}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to delete topic");
    });
}
