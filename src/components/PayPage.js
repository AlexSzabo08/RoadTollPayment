import React from 'react'

import PaymentButton from './PaymentButton'
import '../css/PayPage.css'
import { ImRoad } from "react-icons/im"
import { useSpring, animated } from "react-spring"

export default function PayPage(props) {

    const choice = props.btnInfo.choice

    const [payAnim, setPay] = useSpring(() => ({
        from: {},
        to: {}
    }))

    const btnAnim = useSpring({
        delay:1200,
        from: {opacity: 0},
        to: (choice == 'PAY') ? {opacity: 1} : {opacity: 0},
    })

    const textAnim = useSpring({
        delay:400,
        from: {opacity: 0, marginTop: '20vh'},
        to: (choice == 'PAY') ? {opacity: 1, marginTop: '10vh'} : {opacity: 0},
    })

    if (choice == 'PAY') {
        
        let topPosition  = props.btnInfo.y.toString() + 'px'
        let leftPosition = props.btnInfo.x.toString() + 'px'
        setPay({
            from: {
                top:  props.btnInfo.y.toString() + 'px',
                left: props.btnInfo.x.toString() + 'px',
                height: '0vh',
                width: '0vw'
            },
            to: {
                top:  '0px',
                left: '0px' ,
                height: '100vh',
                width:  '100vw'
            }

        })
        

        return (
            <animated.div className="pay-page" style={ payAnim }>
                <animated.div className="icon-div" style={ textAnim }>
                    <ImRoad className="road-icon" size="15vmin"/>
                </animated.div>

                <animated.div className="pay-text" style={ textAnim }>
                    <p>Select a payment type</p>
                </animated.div>
                
                <animated.div className="btn-container" style={btnAnim} >

                    <PaymentButton time='7 days' price='0.003' pay={props.pay} toWei ={ props.toWei }/>
                    
                    <PaymentButton time='30 days' price='0.007' pay={props.pay} toWei ={ props.toWei }/>
                    
                    <PaymentButton time='90 days' price='0.012' pay={props.pay} toWei ={ props.toWei }/>
                    
                    <PaymentButton time='1 year ' price='0.027' pay={props.pay} toWei ={ props.toWei }/>
                    
                </animated.div>

            </animated.div>
        )  
        
        
    }
    else return null
}
 