// const GlobalState = {
//     data: ""
// };

import { DOWN, INCREASE_SCORE, INCREASE_SNAKE, LEFT, RESET_GAME, RESET_SCORE, RIGHT, SET_DIS_DIRECTION, UP } from "../actions";

interface ISnakeCoord {
    x: number;
    y: number;
  }
  
  export interface IGlobalState {
    snake: ISnakeCoord[] | [];
    disallowedDirection:string;
    score:number;
  }
  
  const GlobalState: IGlobalState = {

    snake: [
      { x: 580, y: 300 },
      { x: 560, y: 300 },
      { x: 540, y: 300 },
      { x: 520, y: 300 },
      { x: 500, y: 300 },
    ],
    disallowedDirection:"",
    score:0,
  };

const gameReducer = (state = GlobalState, action:any) => {
  switch (action.type) {

        case RIGHT:{
          let newSnake = [...state.snake];
          newSnake = [{
            x: state.snake[0].x + action.payload[0],
            y: state.snake[0].y + action.payload[1],
          }, ...newSnake];
          newSnake.pop();
    
          return {
            ...state,
            snake: newSnake,
          };
        }
        case LEFT:{
          let newSnake = [...state.snake];
          newSnake = [{
            x: state.snake[0].x + action.payload[0],
            y: state.snake[0].y + action.payload[1],
          }, ...newSnake];
          newSnake.pop();
    
          return {
            ...state,
            snake: newSnake,
          };
        }
        case UP:{
          let newSnake = [...state.snake];
          newSnake = [{
            x: state.snake[0].x + action.payload[0],
            y: state.snake[0].y + action.payload[1],
          }, ...newSnake];
          newSnake.pop();
    
          return {
            ...state,
            snake: newSnake,
          };
        }
        case DOWN: {
          let newSnake = [...state.snake];
          newSnake = [{
            x: state.snake[0].x + action.payload[0],
            y: state.snake[0].y + action.payload[1],
          }, ...newSnake];
          newSnake.pop();
    
          return {
            ...state,
            snake: newSnake,
          };
        }

        case SET_DIS_DIRECTION:{
            return { ...state, disallowedDirection: action.payload };}

        case INCREASE_SNAKE:{
          const snakeLen = state.snake.length;
          return{
            ...state,
            snake:[
              ...state.snake,{
              x:state.snake[snakeLen-1].x - 20,
              y:state.snake[snakeLen-1].y - 20,
              }
            ],
          }
        }

        case INCREASE_SCORE:{
          return {...state,score:state.score+1}
        }

        case RESET_GAME:{
          return{...state,snake: [
            { x: 580, y: 300 },
            { x: 560, y: 300 },
            { x: 540, y: 300 },
            { x: 520, y: 300 },
            { x: 500, y: 300 },
          ],
          disallowedDirection:"",
          score:0,}
        }

        case RESET_SCORE:{
          return {...state,score:0}
        }

        default:
            return state;
    }
}

export default gameReducer
