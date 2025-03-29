import {  HStack } from '@chakra-ui/react'
import { Router } from './router/Router'
function App() {

  return (
     <HStack justify={"center"} height={"100vh"} bg={"blue.100"}>
      <Router />
    </HStack>
  )
}

export default App
