import { Flex, Heading } from "@chakra-ui/react";
import LLMChatBox from "@/components/LLMChatBox";

const Home = () => {
  return (
    <Flex direction="column" gap={6} p={8} maxW="800px" mx="auto">
      <Heading size="lg">LLMのAIサンプル</Heading>
      <div style={{ fontSize: "1.1rem", color: "#555" }}>
        このサービスは大規模言語モデル（LLM）を活用したチャットAIのサンプルです。
      </div>
      <div style={{ fontSize: "1.1rem", color: "#555" }}>
        現在「80歳のベテラン料理人」としてモデルを調整しています。
      </div>
      <div style={{ fontSize: "1.1rem", color: "#555" }}>ぜひ料理の質問を入力してみてください！</div>
      <LLMChatBox />
    </Flex>
  );
};

export default Home;
