import { render } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

// Chakra UI 用のラッパー関数を作成
const renderWithChakra = (ui: React.ReactElement) => {
  return    render(
      <ChakraProvider value={defaultSystem}>
          {ui}
        </ChakraProvider>
      )
};

export default renderWithChakra;
