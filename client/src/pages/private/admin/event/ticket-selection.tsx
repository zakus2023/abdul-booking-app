import { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Input, message } from "antd";
import PaymentModel from "./payment-model";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "../../../../api-services/payment-services";

const stripePromise = loadStripe(
  "pk_test_51N5quMDHDtaIvDO2nmKU2EZnqpoZvT3QUWUFzD79fu6Ht9iPxR2zrv5NJvxMZ98s1lTeRkmuXvTLQz82PEpcHnQB00lIceFH6V"
);

function TicketSelection({ eventData }: { eventData: EventType }) {
  const ticketTypes = eventData.ticketTypes;
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [selectedTicketsCount, setSelectedTicketsCount] = useState(1);
  const [maxCount, setMaxCount] = useState(1);

  const [stripeOptions, setStripeOptions] = useState<any>({});
  const [showPaymentModel, setShowPaymentModel] = useState<boolean>(false);

  const getClientSecretAndOpenPaymentModel = async () => {
    try {
      setLoading(true);
      const response = await getClientSecret(totalAmount);
      setStripeOptions({
        clientSecret: response.clientSecret,
      });

      setShowPaymentModel(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedTicketTypeObj = ticketTypes.find(
    (ticketType) => ticketType.name === selectedTicketType
  );

  const selectedTicketsPrice = selectedTicketTypeObj
    ? selectedTicketTypeObj.price
    : 0;

  const totalAmount = selectedTicketsPrice * selectedTicketsCount;

  return (
    <div>
      <div>
        <h1 className="text-sm text-info font-bold">Select Ticket Type</h1>
        <div className="flex flex-wrap gap-5 mt-3 ">
          {ticketTypes.map((ticketType, index) => {
            const available = ticketType.available ?? ticketType.limit;
            return (
              <div
                key={index}
                className={`p-2 border border-gray-200 bg-gray-100 lg:w-96 w-full cursor-pointer ${
                  selectedTicketType === ticketType.name
                    ? "border-solid border-primary border-2"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTicketType(ticketType.name);
                  setMaxCount(available);
                }}
              >
                <h1 className="text-sm text-gray-700 mt-3 uppercase">
                  {ticketType.name}
                </h1>
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">${ticketType.price}</h1>
                  <h1 className="text-sm">{available} - left</h1>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
        <h1 className="text-info text-sm font-bold mt-7">Quantity</h1>
        <Input
          value={selectedTicketsCount}
          className="w-96 mt-3"
          type="number"
          onChange={(e) => setSelectedTicketsCount(parseInt(e.target.value))}
          min={1}
          max={maxCount}
        />
        
        <span className="text-gray-600 text-sm">
          {selectedTicketsCount > maxCount ? `Only ${maxCount} tickets available`:""}
        </span>
        </div>
        <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3 items-center">
          <h1 className="text-bold">Total Amount: ${totalAmount}</h1>
          <Button
            type="primary"
            onClick={() => getClientSecretAndOpenPaymentModel()}
            disabled={!selectedTicketType || !selectedTicketsCount || loading || selectedTicketsCount > maxCount}
            loading={loading}
          >
            Book Now
          </Button>
        </div>
      </div>
      {stripeOptions.clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          {showPaymentModel && (
            <PaymentModel
              showPaymentModel={showPaymentModel}
              setShowPaymentModel={setShowPaymentModel}
              selectedTicketType={selectedTicketType}
              selectedTicketsCount={selectedTicketsCount}
              totalAmount={totalAmount}
              event={eventData}
            />
          )}
        </Elements>
      )}
    </div>
  );
}

export default TicketSelection;
