import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

const SetupForm = () => {
   const stripe = useStripe()
   const elements = useElements()
   
   const [errorMessage, setErrorMessage] =  useState(null)

    async function handleSubmit(event){
        event.preventDefault()

        if (!stripe || !elements){
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        const response = await stripe.confirmSetup({
            elements,
            redirect: 'if_required',
            confirmParams: {
                return_url: 'http://localhost:8000/profile'
            }
        })

        if (response.error){
            setErrorMessage(response.error.message)
        }
        else {
            window.location.reload(true)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe}>Submit</button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    )
}

export default SetupForm
