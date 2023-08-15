import { Button, Center, Flex } from '@chakra-ui/react'
import React from 'react'

interface IMobileButtonsProp{
    handleMobileButtons:(e:KeyboardEvent)=>void;
}

const MobileButtons = ({handleMobileButtons}:IMobileButtonsProp) => {
  
    const handleKeyEvents = (value:string)=>{
        const event = new KeyboardEvent('keydown',{key:value})
        handleMobileButtons(event)
    }
  
    return (
    <Flex mt={10} flexDirection="column" gap={2} alignItems="center" >
        <Button width={20} onClick={()=>handleKeyEvents('w')} >up</Button>
        <Flex gap={2} >
            <Button onClick={()=>handleKeyEvents('a')} >left</Button>
            <Button onClick={()=>handleKeyEvents('s')} >down</Button>
            <Button onClick={()=>handleKeyEvents('d')} >right</Button>
        </Flex>
    </Flex>
  )
}

export default MobileButtons