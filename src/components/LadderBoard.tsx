import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTop3 } from "../firebase/functions";

const LadderBoard = () => {

    //Firebase LadderBoard

    const [ladderBoard, setLadderBoard] = useState<any>(null)

    useEffect(() => {
        //Getting ladderboard
        async function fetchLadderBoard() {
            const ladderBoardData = await getTop3();
            setLadderBoard(ladderBoardData)
        }
        
        fetchLadderBoard();

    }, [])

    return (
        <Box mt={3}>
            <Heading as="h2" size="lg" >
                Hall Of Fame
            </Heading>


            <Flex flexDirection="column" >
                {
                    ladderBoard?.map((item: any) => {
                        return <div style={{marginTop:"0.5rem" ,display:"flex" , gap:"2rem" , justifyContent:"start" ,alignItems:"center" }} key={item.name}>
                            <span>{item.name}</span>
                            <span>{item.score}</span>
                        </div>
                    })
                }
            </Flex>

        </Box>
    )
}

export default LadderBoard