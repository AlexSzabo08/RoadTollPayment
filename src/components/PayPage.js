import React from 'react'

import PaymentButton from './PaymentButton'
import '../css/PayPage.css'
import { ImRoad } from "react-icons/im"
import { useSpring, animated } from "react-spring"

export default function PayPage(props) {
    

    const btnPressed = props.position.x != 0

    const [pageAnim, setAnim] = useSpring(() => ({
        from: {},
        to: {}
    }))

    const btnAnim = useSpring({
        delay:500,
        from: {opacity: 0, marginTop: '20vh'},
        to: btnPressed ? {opacity: 1, marginTop: '15vh'} : {opacity: 0},
        config: {duration: 800}
    })

    if (props.choice == 'PAY'){
        let topPosition  = props.position.y.toString() + 'px'
        let leftPosition = (props.position.x + 100).toString() + 'px'
        console.log('top', topPosition)
        console.log('left', leftPosition)
        setAnim({
            from: {
                top:  topPosition,
                left: leftPosition,
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
            <animated.div className="pay-page" style={ pageAnim }>
                <div className="icon-div">
                    <ImRoad className="road-icon" size="15vmin"/>
                </div>

                <div className="pay-text">
                    <text>Select a payment type</text>
                </div>
               
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
 