import { ChakraProvider, Container, Flex, Heading } from "@chakra-ui/react";
import './App.css';
import CanvasBoard from "./components/CanvasBoard";
import ScoreCard from "./components/ScoreCard";
import StartPage from "./components/StartPage";
import { useCallback, useEffect, useState } from "react";
import { addOrUpdateUser, getTop3 } from "./firebase/functions";




function App() {

  const [isUser, setIsUser] = useState<boolean>(false)
  const [tempUser, setTempUser] = useState<string>('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTempUser(e.target.value)
  }

  const handleSubmit = useCallback(((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      localStorage.setItem('snake-game-user', tempUser)
      //Firebase Functions
      const userScore = Number(localStorage.getItem('high-score'))
      addOrUpdateUser(tempUser, userScore)
      setTempUser('')
    }
  })
    , [tempUser])

  useEffect(() => {
    if (localStorage.getItem('snake-game-user')) {
      setIsUser(true)
    }
  }, [handleSubmit])

  return (

    <ChakraProvider>
      <Container maxW="container.lg" centerContent >
        {isUser !== false ? <><Heading as='h1' size='xl' >Snake Game</Heading><ScoreCard />
          <CanvasBoard height={600} width={1000} />
          </> : <StartPage handleSubmit={handleSubmit} handleChange={handleChange} user={tempUser} />}
      </Container>
    </ChakraProvider>

  );
}

export default App;



