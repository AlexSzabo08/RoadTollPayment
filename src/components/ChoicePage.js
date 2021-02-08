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
	
	const choice =  e => {
		
		if(e.target.innerHTML == 'CHECK')
			props.check()

		props.setInfo({
			x: e.clientX,
			y: e.clientY,
			choice: e.target.innerHTML
		})

		setTimeout(() => {
			console.log('timeout')
			props.setInfo({
				x: e.clientX,
				y: e.clientY,
				choice: e.target.innerHTML
			})
		}, 10);

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
							<p>Pay your road toll with ethereum and store it safely on the blockchain</p>
						</div>
					</animated.div>
					<animated.div className="choice-div" style={divAnim}>
						<div className="button-div">
							<FaCheckCircle size="3em" color="#00ff15" className="circle-icon"/>
							<button onClick={ choice }>CHECK</button>
						</div>
						<div className="text-div">
							<p>Check if the fee is already payed or when it expires</p>
						</div>
					</animated.div>
				</div>
			</animated.div>
		)
	else
		return null
}

export default ChoicePage