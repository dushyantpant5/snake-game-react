import { Heading } from "@chakra-ui/react"
import { useState } from "react"

interface IStartPageProp{
    handleSubmit:(e:React.KeyboardEvent<HTMLInputElement>)=>void;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    user:string;
}

const StartPage = ({handleSubmit,handleChange,user}:IStartPageProp) => {


    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "2rem" }} >
            <Heading as="h3">Enter Your Name</Heading>
            <input value={user} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleSubmit(e)} style={{
                border: "black solid 2px",
                height: "2rem",
                borderRadius: "10px"
            }} type="text" />
        </div>
    )
}

export default StartPage