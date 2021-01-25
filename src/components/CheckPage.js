import React from 'react'

import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import '../css/CheckPage.css'
import { useSpring, animated } from "react-spring"

export default function CheckPage(props) {
    const [pageAnim, setAnim] = useSpring(() => ({
        from: {},
        to: {}
    }))

    const x = () => {
        console.log(props.status.expired)
    }

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
                {props.status.expired ?
                    <AiOutlineClose size='20vmin' color='red'/>
                    : <AiOutlineCheck size='20vmin' color='green'/>
                }
            </animated.div>
        )
    }
    else
        return null
}
