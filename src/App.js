import { useState, useEffect } from "react";

import Web3 from "web3";
import RoadToll from './abis/RoadToll.json'
import IntroPage from './components/IntroPage'
import ChoicePage from './components/ChoicePage'
import PayPage from './components/PayPage'
import CheckPage from "./components/CheckPage";

function App() {
  const eth = window.ethereum

  const [contract,setContract] = useState({})

  const [status, setStatus] = useState({})

  const [loading, setLoading] = useState(false)

  const [userAccount, setAccount] = useState('')

  const [licensePlate, setPlate] = useState('none')

  const [userChoice, setChoice] = useState('')

  const [btnPosition, setPosition] = useState({
    x: 0,
    y: 0
  })

  const [plateSubmitted, setSubmitted] = useState(false)

  useEffect(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    const accounts = await eth.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])

    const web3 = window.web3

    const networkId =  await web3.eth.net.getId()
    const contractData = RoadToll.networks[networkId]

    if(contractData) {
      const roadToll = new web3.eth.Contract(RoadToll.abi, contractData.address)
      console.log(roadToll)
      setContract(roadToll)
    } else {
      window.alert('RoadToll contract not deployed to detected network.')
    }
}, [])    

  const buttonClick = () => {
    if(licensePlate.length == 7)
      setSubmitted(true)
  }

  const conversion = amount => {
    amount = window.web3.utils.toWei(amount, 'ether')
    return amount
  }

  const payToll = etherAmount => {
    setLoading(true)
    contract.methods.payToll(licensePlate,2021,1,25).send({ value: etherAmount, from: userAccount }).on('transactionHash', (hash) => {
      setLoading(false)
    })
  }

  const check = async () => {
    const today = new Date()
    const expDate = await contract.methods.checkToll(licensePlate).call()
    let expired = false
    console.log(1,expired)
    if(today.getFullYear() > expDate.year){
      expired = true
      console.log('years',today.getFullYear(),expDate.year)
    } else if(today.getMonth() + 1 > expDate.month){
        expired = true
        console.log(3,expired)
      } else if(today.getDay() > expDate.day){
          expired = true
          console.log(4,expired)
        }
        console.log(5,expired)
    setStatus ({
      expired: expired,
      expYear: expDate.year,
      expMonth: expDate.month,
      expDay: expDate.day, 
    })
  }

  return (
    <div>
      <IntroPage licensePlate = {licensePlate} onChange = { setPlate } btnClick = {buttonClick}/> 
      <ChoicePage show = { plateSubmitted } setPosition = { setPosition } setChoice = {setChoice} check = { check }/>
      <PayPage position = { btnPosition } choice = { userChoice } pay = { payToll } toWei = { conversion } />
      <CheckPage position = { btnPosition } choice = { userChoice } status = {status} />
    </div>
   
  )
}

export default App
