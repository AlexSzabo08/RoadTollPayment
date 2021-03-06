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

  const [userAccount, setAccount] = useState('')

  const [licensePlate, setPlate] = useState('none')

  const [btnInfo, setInfo] = useState({
    x: 0,
    y: 0,
    choice: ''
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
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    contract.methods.payToll(licensePlate,year, month, day).send({ value: etherAmount, from: userAccount }).on('transactionHash', (hash) => {
      window.location.reload()
    })
  }

  const check = async () => {
    const today = new Date()
    const expDate = await contract.methods.checkToll(licensePlate).call()
    let expired = false
    if(today.getFullYear() > expDate.year){
      expired = true
    } else if(today.getMonth() + 1 > expDate.month && today.getFullYear() == expDate.year){
        expired = true
      } else if(today.getDate() > expDate.day && today.getFullYear() == expDate.year && today.getMonth() + 1 == expDate.month){
          expired = true
        }
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
      <ChoicePage show = { plateSubmitted } setInfo = { setInfo } check = { check }/>
      <PayPage btnInfo = { btnInfo } pay = { payToll } toWei = { conversion } />
      <CheckPage btnInfo = { btnInfo } plate = { licensePlate } status = {status} />
    </div>
   
  )
}

export default App
