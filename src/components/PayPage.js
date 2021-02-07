import React from 'react'

import PaymentButton from './PaymentButton'
import '../css/PayPage.css'
import { ImRoad } from "react-icons/im"
import { useSpring, animated } from "react-spring"

export default function PayPage(props) {

    let topPosition  = props.position.y.toString() + 'px'
    let leftPosition = props.position.x.toString() + 'px'

    const pageAnim = useSpring({
        from: {
            top:  topPosition,
            left: leftPosition,
            height: '0vh',
            width: '0vw'
        },
        to: (props.choice == 'PAY')
            ?{
                top:  '0px',
                left: '0px' ,
                height: '100vh',
                width:  '100vw'
            }
            :{}

    })

    const btnAnim = useSpring({
        delay:1200,
        from: {opacity: 0},
        to: (props.choice == 'PAY') ? {opacity: 1} : {opacity: 0},
    })

    const textAnim = useSpring({
        delay:400,
        from: {opacity: 0, marginTop: '20vh'},
        to: (props.choice == 'PAY') ? {opacity: 1, marginTop: '10vh'} : {opacity: 0},
    })

    if (props.choice == 'PAY' && props.position.x != 0) {
        
        let topPosition  = props.position.y.toString() + 'px'
        let leftPosition = props.position.x.toString() + 'px'
        console.log('top', topPosition)
        console.log('left', leftPosition)
        
        return (
            <animated.div className="pay-page" style={ pageAnim }>
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
 