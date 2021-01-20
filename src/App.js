import { useState } from "react";

import IntroPage from './components/IntroPage'
import ChoicePage from './components/ChoicePage'

function App() {
  const [licensePlate, setPlate] = useState('none')
  const [plateSubmitted, setSubmitted] = useState(false)

  const handleChange = (newLicensePlate) => {
    setPlate(newLicensePlate)
  }

  const buttonClick = () => {
    if(licensePlate.length == 7)
      setSubmitted(true)
  }

  return (
    <div>
      <IntroPage licensePlate = {licensePlate} onChange = { handleChange } btnClick = {buttonClick}/> 
      <ChoicePage show = { plateSubmitted }/>
    </div>
   
  )
}

export default App
