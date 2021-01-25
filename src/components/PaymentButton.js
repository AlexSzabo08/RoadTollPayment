import React from 'react'

import '../css/PayPage.css'


export default function PaymentButton(props) {

    const payToll = () => {
        let amount = props.price
        console.log(amount)
        amount = props.toWei(amount)
        props.pay(amount)
    }

    return (
        <div>
            <button className="pay-btn" onClick={ payToll }>
                        <p>{ props.time }</p>
                        <p>{ props.price } eth</p>
                    </button>
        </div>
    )
}
