import {Provider} from "react-redux"
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import './App.css';
import CanvasBoard from "./components/CanvasBoard";
import store from './store/index'
import ScoreCard from "./components/ScoreCard";

function App() {
  return (
   <Provider store={store} >
    <ChakraProvider>
     <Container maxW="container.lg" centerContent >
      <Heading as='h1' size='xl' >Snake Game</Heading>
      <ScoreCard/>
      <CanvasBoard height={600} width={1000} />
     </Container>
   </ChakraProvider>
   </Provider>
  );
}

export default App;
