import { Flex, Heading } from "@chakra-ui/react";
import LLMChatBox from "@/components/LLMChatBox";

const Home = () => {
  return (
    <Flex direction="column" gap={6} p={8} maxW="800px" mx="auto">
      <Heading size="lg">HOME</Heading>
      <LLMChatBox />
    </Flex>
  );
};

export default Home;
