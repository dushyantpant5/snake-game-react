import { Box, Button, Flex, Heading, Kbd } from "@chakra-ui/react";

interface IInstructionsProp{
    resetBoard:()=>void;
}

const Instructions = ({resetBoard}:IInstructionsProp) => {
  return (
    <Box mt={3}>
        <Heading as="h6" size="lg" >
            How to Play
        </Heading>
        <Heading as="h5" size="sm" mt={1}>
            NOTE: Start the game by pressing <Kbd>d</Kbd>
        </Heading>

        <Flex flexDirection="row" mt={3} gap={10}>
            <Flex flexDirection="column" >
                <span>
                    <Kbd>w</Kbd> Move Up
                </span>
                
                <span>
                    <Kbd>s</Kbd> Move Down
                </span>
                
                <span>
                    <Kbd>a</Kbd> Move Left
                </span>
                
                <span>
                    <Kbd>d</Kbd> Move Right
                </span>
            </Flex>
            <Flex flexDirection="column" >
                <Button onClick={()=>resetBoard()} >Reset Game</Button>
            </Flex>
        </Flex>

    </Box>
  )
}

export default Instructions