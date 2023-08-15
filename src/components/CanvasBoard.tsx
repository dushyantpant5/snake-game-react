import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IObjectBody, clearBoard, drawObject, generateRandomPosition, hasSnakeCollidedWithItself } from "../utilities/index"
import { IGlobalState } from "../store/reducers"
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, RESET_SCORE, increaseScore, increaseSnake, makeMove, resetGame, resetScore, stopGame } from "../store/actions"
import Instructions from "./Instructions"

interface ICanvasBoard {
    height: number,
    width: number
}


const CanvasBoard = ({ height, width }: ICanvasBoard) => {
    const dispatch = useDispatch();
   
    
    const {score,snake} = useSelector((state:IGlobalState)=>state)
    
    const disallowedDirection = useSelector((state: IGlobalState) => {
        return state.disallowedDirection;
    })

    const [gameEnded,setGameEnded] = useState<boolean>(false)
    const [pos, setPos] = useState<IObjectBody>(generateRandomPosition(width - 20, height - 20))
    const [isConsumed,setIsConsumed] = useState<boolean>(false)

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);


    const moveSnake = useCallback(
        (dx = 0, dy = 0, ds: string) => {
          if (dx > 0 && dy === 0 && ds !== "RIGHT") {
            dispatch(makeMove(dx, dy, MOVE_RIGHT));
          }
    
          if (dx < 0 && dy === 0 && ds !== "LEFT") {
            dispatch(makeMove(dx, dy, MOVE_LEFT));
          }
    
          if (dx === 0 && dy < 0 && ds !== "UP") {
            dispatch(makeMove(dx, dy, MOVE_UP));
          }
    
          if (dx === 0 && dy > 0 && ds !== "DOWN") {
            dispatch(makeMove(dx, dy, MOVE_DOWN));
          }
        },
        [dispatch]
      );
    
      const handleKeyEvents = useCallback(
        
        (event: KeyboardEvent) => {

            if (disallowedDirection) {
                switch (event.key) {
                    case "w":
                        moveSnake(0, -20, disallowedDirection);
                        break;
                    case "s":
                        moveSnake(0, 20, disallowedDirection);
                        break;
                    case "a":
                        moveSnake(-20, 0, disallowedDirection);
                        break;
                    case "d":
                        event.preventDefault();
                        moveSnake(20, 0, disallowedDirection);
                        break;
                }
            }
            else
            {
                if (
                    disallowedDirection !== "LEFT" &&
                    disallowedDirection !== "UP" &&
                    disallowedDirection !== "DOWN" &&
                    event.key === "d"
                  )
                    moveSnake(20, 0, disallowedDirection);
            }
        },
        [disallowedDirection, moveSnake]
    )

    const resetBoard = useCallback(()=>{
        setGameEnded(false)
        window.removeEventListener("keydown",handleKeyEvents);
        dispatch(resetGame());
        dispatch(resetScore());
        clearBoard(context);
        drawObject(context,snake,"#91C483");
        drawObject(context,[generateRandomPosition(width - 20, height - 20)],"#676FA3");
        window.addEventListener("keydown",handleKeyEvents);

    },[context, dispatch, handleKeyEvents, height, snake, width])

  

    useEffect(()=>{
      
        if(isConsumed)
        {
   
            setIsConsumed(false)
            dispatch(increaseSnake())
            dispatch(increaseScore())
            
            
        }
       
    },[isConsumed,pos])


    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        clearBoard(context)
        drawObject(context, snake, "#91C483")
        drawObject(context, [pos], "#676FA3");
        if(snake[0].x===pos?.x && snake[0].y===pos?.y)
        {
            setIsConsumed(true)
            const foodNewPos = generateRandomPosition(width-20,height-20)
            setPos(foodNewPos)
        }
        if(snake[0].x >= width || snake[0].x<0 || snake[0].y >=height || snake[0].y<0  || hasSnakeCollidedWithItself(snake,snake[0]) )
        {
            setGameEnded(true)
            dispatch(stopGame())
            window.removeEventListener("keydown", handleKeyEvents);
        }

        //Adding High-Score

        if(localStorage.getItem('high-score')===null)
        {
            localStorage.setItem('high-score','0')
        }
        else
        {
          
            const highScore = localStorage.getItem('high-score')
            if(highScore)
            {
                if(score>Number(highScore))
                {
                    const stringScore = score.toString()
                    localStorage.setItem('high-score',stringScore)
                }
            }
        }

    }, [context, pos, snake])

    
    useEffect(() => {
        window.addEventListener("keydown", handleKeyEvents);
    
        return () => {
          window.removeEventListener("keydown", handleKeyEvents);
        };
      }, [disallowedDirection, handleKeyEvents]);
 

    return (
        <>
            <canvas
                ref={canvasRef}

                height={height}
                width={width}

                style={{ border: `3px solid ${!gameEnded?'black':'red'}` }}

            >

            </canvas>
            <Instructions resetBoard={resetBoard} />
        </>
    )
}

export default CanvasBoard