import React from 'react'

import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import '../css/CheckPage.css'
import { useSpring, animated } from "react-spring"

export default function CheckPage(props) {
    const [pageAnim, setAnim] = useSpring(() => ({
        from: {},
        to: {}
    }))

    const year = props.status.expYear
    const month = props.status.expMonth
    const day = props.status.expDay

    const iconAnim = useSpring({
        delay:1500,
        from: {opacity: 0, marginTop: '10vh'},
        to: (props.choice == 'CHECK') ? {opacity: 1, marginTop: '5vh'} : {opacity: 0},
    })

    const textAnim = useSpring({
        delay:2000,
        from: {opacity: 0, marginTop: '10vh'},
        to: (props.choice == 'CHECK') ? {opacity: 1} : {opacity: 0},
    })

    const plateAnim = useSpring({
        delay:400,
        from: {opacity: 0, marginTop: '15vh'},
        to: (props.choice == 'CHECK') ? {opacity: 1, marginTop: '5vh'} : {opacity: 0},
    })

    if (props.choice == 'CHECK'){
        console.log(props.status.expired)
        let topPosition  = props.position.y.toString() + 'px'
        let leftPosition = props.position.x.toString() + 'px'
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
            <animated.div className="check-page" style={ pageAnim }>
                <animated.div className="license-plate" style={ plateAnim }>
                    <p>{ props.plate }</p>
                </animated.div>
                <animated.div style={ iconAnim }>
                    {props.status.expired 
                        ?<AiOutlineClose size='20vmin' color='red'/>
                        :<AiOutlineCheck size='20vmin' color='#00ff15'/>
                    } 
                </animated.div>

                <animated.div className="status" style={ textAnim }>
                    {props.status.expired 
                        ? <p className="expired">You haven't payed your road toll {month}/{day}/{year}</p>
                        : <p className="payed">Your toll is payed until {month}/{day}/{year}</p>
                    }
                </animated.div>
                
            </animated.div>
        )
    }
    else
        return null
}
