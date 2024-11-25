// import axios from "axios"

// export const getClientSecret = async (amount : number)=>{
//     const response = await axios.post('/api/payments/create-payment-intent', {
//         amount
//     })
//     return response.data
// }

import axios from "axios";

export const getClientSecret = async (amount:number) => {
  try {
    const response = await axios.post('/api/payments/create-payment-intent', {
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};