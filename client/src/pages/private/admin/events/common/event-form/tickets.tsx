
import { EventFormStepProps } from ".";
import { Button, Input } from "antd";

function Tickets({
  currentStep,
  setCurrentStep,
  eventData,
  setEventData,
  loading,
  onFinish,
}: EventFormStepProps) {
  const onAddTicketType = () => {
    const newTicketTypes = eventData.ticketTypes || [];
    newTicketTypes.push({
      name: "",
      price: 0,
      limit: 0,
      
    });

    setEventData({ ...eventData, ticketTypes: newTicketTypes });
  };

  const onTicketTypePropertyValueChange = ({
    property,
    value,
    index,
  }: {
    property: string;
    value: string | number;
    index: number;
  }) => {
    const newTicketTypes = eventData.ticketTypes || [];
    newTicketTypes[index][property] = value;
    setEventData({ ...eventData, ticketTypes: newTicketTypes });
  };

  const onTicketTypeDelete = (index: number) => {
    const newTicketTypes = eventData.ticketTypes || [];
    newTicketTypes.splice(index, 1);
    setEventData({ ...eventData, ticketTypes: newTicketTypes });
  };

  return (
    <div className="flex flex-col gap-5">
      <Button onClick={() => onAddTicketType()} className="w-max">
        Add Ticket Type
      </Button>
      {eventData?.ticketTypes?.length > 0 && (
        <div className="">
          <div className="grid grid-cols-4 gap-5">
            <span className="font-semibold">Name</span>
            <span className="font-semibold">Price</span>
            <span className="font-semibold">Limit</span>
          </div>
          {eventData.ticketTypes.map((ticketType: any, index: number) => (
            <div className="grid grid-cols-4 gap-5 mb-3">
              <Input
                placeholder="Name"
                value={ticketType.name}
                onChange={(e: any) =>
                  onTicketTypePropertyValueChange({
                    property: "name",
                    value: e.target.value,
                    index,
                  })
                }
              />
              <Input
                placeholder="Price"
                typeof="number"
                value={ticketType.price}
                onChange={(e: any) =>
                  onTicketTypePropertyValueChange({
                    property: "price",
                    value: e.target.value,
                    index,
                  })
                }
              />
              <Input
                placeholder="Limit"
                typeof="number"
                value={ticketType.limit}
                onChange={(e: any) =>
                  onTicketTypePropertyValueChange({
                    property: "limit",
                    value: e.target.value,
                    index,
                  })
                }
              />
              <Button
                className="border-none"
                typeof="link"
                danger
                onClick={() => onTicketTypeDelete(index)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-10 justify-between col-span-3">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={onFinish}
          loading={loading}
          disabled={loading}
        >
          Save & Finish
        </Button>
      </div>
    </div>
  );
}

export default Tickets;
