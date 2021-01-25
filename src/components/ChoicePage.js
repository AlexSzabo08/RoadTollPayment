import '../css/ChoicePage.css'
import { animated, useSpring} from 'react-spring'
import { FaEthereum, FaCheckCircle } from 'react-icons/fa'

function ChoicePage(props) {
	const divAnim = useSpring({
		delay:800,
		from: {opacity: 0, marginTop: '20vh'},
		to: props.show ? {opacity: 1, marginTop: '13vh'} : {opacity: 0},
		config: {duration: 800}
	})

	const pageAnim = useSpring({
		from: {marginTop: '100vh'},
		to: props.show ? {marginTop: '0vh'} : {}
	})
	
	const choice = async e => {
		if(e.target.innerHTML == 'CHECK')
			await props.check()

		props.setPosition({
			x: e.clientX,
			y: e.clientY
		})

		props.setChoice(e.target.innerHTML)
		
	}
	
	if (props.show)
		return(
			<animated.div className="main" style={pageAnim}>
				<p className="title">What would you like </p>
				<p className="title">to do next?</p>
				<div className="container">
					<animated.div className="choice-div" style={divAnim}>
						<div className="button-div">
							<FaEthereum size="3em" color="#04d9ff"/>
							<button onClick={ choice }>PAY</button>
						</div>
						<div className="text-div">
							<text>Pay your road toll with ethereum and store it safely on the blockchain</text>
						</div>
					</animated.div>
					<animated.div className="choice-div" style={divAnim}>
						<div className="button-div">
							<FaCheckCircle size="3em" color="#00ff15" className="circle-icon"/>
							<button onClick={ choice }>CHECK</button>
						</div>
						<div className="text-div">
							<text>Check if the fee is already payed</text>
							<p className="note">Note: You will pay a gas fee.</p>
						</div>
					</animated.div>
				</div>
			</animated.div>
		)
	else
		return null
}

export default ChoicePage