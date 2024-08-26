
import { useEffect, useState } from 'react';
import './App.css'
import Die from './components/Die';
import {DieObj} from './interface'
import {nanoid} from 'nanoid'
import Confetti from 'confetti-react';

export function generateRadNum(min:number, max:number){
  return Math.floor( Math.random() * (max - min + 1) + min)
} 

function App() {

  const min:number = 1;
  const max:number = 6;  

  const [dice, setDice] = useState(initializeArray(min, max)); 
  const [win, setWin] = useState(false);

  function initializeArray(min:number, max:number):DieObj[]{

    return new Array(10).fill({face:0, isHeld:false, id:0}).map(
      (el)=> 
        ({  ...el, 
            face: generateRadNum(min, max),
            id:nanoid()
        })       
    );
  } 

 

  function setHeld(id:string){  

    if(dice.some(die => die.isHeld === false)){
      setDice(
        prevState =>
          prevState.map( el =>
            el.id===id
            ? {...el, isHeld:!el.isHeld}
            :el          
          )      
      );
    }    
  }

 
  const dieList:any = dice.map(die => <Die key={die.id} die={die} setHeld={setHeld} />)

  function roleDice(){
    setDice(
      prevState => 
        prevState.map(
          die => 
            die.isHeld 
            ? die
            : {...die, face: generateRadNum(min, max)})
    )
  }

  useEffect(()=>{

    const allHeld = dice.every(die => die.isHeld);
    const sameFace = dice.every( die => die.face === dice[0].face)

    if ( sameFace && allHeld )
      setWin(true)    

  }, [dice])

  function resetGame(){  

    setWin(false);
    setDice(
      oldDice => 
        oldDice.map(
          die => ({
            ...die,
            isHeld:false,
            face: generateRadNum(min, max)
          })
        )
      )
  }


  
  return (
    <div>
      {win && <Confetti />}
      <main className="container">

        <div className="dark-layer">
          <div className='light-layer'>
            <div className='text'>              
              <h1 className="title">Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
          
            <div className="grid-container">
            {dieList}
            </div>
            
              {!win 
                ? <button className='roll_btn' onClick={roleDice}>Roll</button>
                : <button className='roll_btn' onClick={resetGame}>Reset</button>
              }
                      
          </div>
        </div>
      </main>
    </div>
  )
}

export default App;
