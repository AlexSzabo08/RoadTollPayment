import { useState } from "react";

import IntroPage from './components/IntroPage'
import ChoicePage from './components/ChoicePage'

function App() {
  const [licensePlate, setPlate] = useState('none')

  const [userChoice, setChoice] = useState('none')

  const [plateSubmitted, setSubmitted] = useState(false)

  const buttonClick = () => {
    if(licensePlate.length == 7)
      setSubmitted(true)
  }

  return (
    <div>
      {licensePlate}
      <IntroPage licensePlate = {licensePlate} onChange = { setPlate } btnClick = {buttonClick}/> 
      <ChoicePage show = { plateSubmitted }/>
    </div>
   
  )
}

export default App
