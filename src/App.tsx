import {  HStack } from '@chakra-ui/react'
import { Router } from './router/Router'
function App() {

  return (
     <HStack   width="100%" 
     minH="100vh"
     justifyContent="center" 
     alignItems="center" 
     bg="blue.100">
      <Router />
    </HStack>
  )
}

export default App
