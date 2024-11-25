import { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Modal, message } from "antd";
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createBooking } from "../../../../api-services/bookings-service";
import { useNavigate } from "react-router-dom";

function PaymentModel({
  showPaymentModel,
  setShowPaymentModel,
  selectedTicketType,
  selectedTicketsCount,
  totalAmount,
  event,
}: {
  showPaymentModel: any;
  setShowPaymentModel: any;
  selectedTicketType: string;
  selectedTicketsCount: number;
  totalAmount: number;
  event: EventType;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      setLoading(true);
      // We don't want to let default form submission happen here,
      // which would refresh the page.
     

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        const bookingPayload = {
          event : event._id,
          ticketType: selectedTicketType,
          ticketsCount: selectedTicketsCount,
          totalPrice: totalAmount,
          paymentId: result.paymentIntent.id,
          status: 'booked'

        }
        await createBooking(bookingPayload)
        message.success("Booking successful")
        navigate('/profile/bookings')
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        setShowPaymentModel(false);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showPaymentModel}
      onCancel={() => setShowPaymentModel(false)}
      title="Make Payment"
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{ mode: "shipping", allowedCountries: ["Canada"] }}
        />

        <div className="mt-7 flex justify-end gap-6">
          <Button onClick={() => setShowPaymentModel(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentModel;
