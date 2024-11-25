import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
event : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
},
user :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
ticketType :{
type: String,
required: true
},
ticketsCount: {
    type: Number,
    required: true
},
totalPrice: {
    type: Number,
    required: true
},
paymentId: {
    type: String,
    required: true
},
status: {
    type: String,
    required: true,
    default: 'booked'
}
}, {timestamps:true})


const Booking = mongoose.model('Booking', bookingSchema)

export default Booking