import { apiClient } from "@/domain/api/apiClient";

export type LLMChatRequest = {
  message: string;
};

export type LLMChatResponse = {
  prompt: string;
  response: string;
};

export const postLLMChat = async (payload: LLMChatRequest): Promise<LLMChatResponse> => {
  return apiClient<LLMChatResponse>({
    url: "/api/llm/chat/",
    method: "POST",
    data: payload,
  });
};
