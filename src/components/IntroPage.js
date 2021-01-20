import React from 'react'
import '../css/IntroPage.css'
import { animated, useSpring} from 'react-spring'

import backGround from '../img/back-ground.jpg'

export default function IntroPage(props) {
    const move = useSpring({
        from: {left: '-10vh'},
        to: {left: '10vh'}
    })

    const handleChange = (e) => {
        props.onChange(e.target.value)
    }

        return (
            <div className="intro-page">
                <img className="img-bg"  src={backGround} alt="BackGround"></img>
                <animated.div className="input-div" style={move}>
                    <p>Enter your license plate </p>
                    <p>here to begin.</p>
                    <input className="input-field" type="text" maxLength="7" onChange={ handleChange }></input>
                    <button className="input-button" onClick={ props.btnClick }>Next</button>
                </animated.div> 
            </div>
        )
}
