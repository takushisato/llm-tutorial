import { useState } from "react";
import { Box, Button, Flex, Textarea, Text } from "@chakra-ui/react";
import { postLLMChat } from "@/domain/api/llm";

const LLMChatBox = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const result = await postLLMChat({ message });
      setResponse(result.response);
    } catch (e) {
      setResponse("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap={4}>
      <Textarea placeholder="質問を入力してください" value={message} onChange={(e) => setMessage(e.target.value)} />

      <Button colorScheme="blue" onClick={handleSend} isLoading={loading} alignSelf="flex-end">
        送信
      </Button>

      {response && (
        <Box p={4} bg="gray.50" borderRadius="md">
          <Text fontWeight="bold">回答</Text>
          <Text whiteSpace="pre-wrap">{response}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default LLMChatBox;
