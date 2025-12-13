import { useState } from "react";
import { Box, Button, Flex, Textarea, Text } from "@chakra-ui/react";

const LLMChatBox = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      // 👇 今は API を叩かない（後で差し替える）
      console.log("send to backend:", message);

      // ダミーレスポンス
      await new Promise((r) => setTimeout(r, 500));
      setResponse("（ここに backend からの返答が入ります）");
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
