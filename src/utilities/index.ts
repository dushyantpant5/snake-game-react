export const clearBoard = (context:CanvasRenderingContext2D | null)=>{
    if(context)
    {
        context.clearRect(0,0,1000,600)
    }
}

export interface IObjectBody{
    x:number,
    y:number
}

export const drawObject = (
    context:CanvasRenderingContext2D | null,
    objectBody:IObjectBody[],
    fillColor:string,
    strokeStyle = "#146356"
)=>{
   if(context)
   {
    objectBody.forEach((object:IObjectBody)=>{
        context.fillStyle = fillColor;
        context.strokeStyle = strokeStyle;
        context?.fillRect(object.x,object.y,20,20);
        context?.strokeRect(object.x,object.y,20,20);
    })
   } 
}

// function getRndInteger(min:number, max:number) {
//     return Math.floor(Math.random() * (max - min) ) + min;
//   }

// export function generateRandomPosition(width:number,height:number)
// {
//     const x = getRndInteger(1,width);
//     const y = getRndInteger(1,height);
//     return {x,y}
// }

function randomNumber(min: number, max: number) {
    let random = Math.random() * max;
    return random - (random % 20);
  }

export const generateRandomPosition = (width: number, height: number) => {
    return {
      x: randomNumber(0, width),
      y: randomNumber(0, height),
    };
  };

export const hasSnakeCollidedWithItself = (snake:IObjectBody[],snakeCurrentHead:IObjectBody) =>{
    for (let index = 1; index < snake.length; index++) {
        const pos = snake[index];
        if (pos.x === snakeCurrentHead.x && pos.y === snakeCurrentHead.y) {
            return true;
        }
    }
    return false;
}