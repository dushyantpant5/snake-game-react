import { Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers";

const ScoreCard = () => {

    const { score } = useSelector((state: IGlobalState) => {
        return state
    })

    const highScore = localStorage.getItem('high-score')

    return (
        <Flex  mt={5} mb={5} flexDirection="row" gap={10} >
            <Heading as="h2" size="md" >Current Score: {score}</Heading>
            <Heading as="h2" size="md" >High Score: {highScore?highScore:0}</Heading>
        </Flex>
    )
}

export default ScoreCard