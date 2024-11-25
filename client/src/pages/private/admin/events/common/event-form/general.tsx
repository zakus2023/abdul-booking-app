import { useState } from "react";
import { EventFormStepProps } from ".";
import { Button, Form, Input, Tag } from "antd";
import { useNavigate } from "react-router-dom";

function General({
  currentStep,
  setCurrentStep,
  eventData,
  setEventData,
}: EventFormStepProps) {
  const [guestInput, setGuestInput] = useState("");
  const navigate = useNavigate();

  const onGuestAdd = () => {
    const existingGuests = eventData.guests || [];
    const newGuests = guestInput.split(",").map((guest) => guest.trim());
    setEventData({ ...eventData, guests: [...existingGuests, ...newGuests] });
    setGuestInput("");
  };

  const onGuestRemove = (guest: string) => {
    const existingGuests = eventData.guests || [];
    const newGuests = existingGuests.filter((g: string) => g !== guest);
    setEventData({ ...eventData, guest: newGuests });
  };
console.log(eventData)
  return (
    <div className="flex flex-col gap-5">
      <Form.Item label="Event Name" required>
        <Input
          placeholder="Event name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Description" required>
        <Input.TextArea
          placeholder="Description"
          value={eventData.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Event Organizer" required>
        <Input
          placeholder="Event Organizer"
          value={eventData.organizer}
          onChange={(e) => setEventData({ ...eventData, organizer: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Guests list ( comma separated )" required>
        <div className="flex gap-5">
          <Input
            placeholder="Guests list ( comma separated )"
            value={guestInput}
            onChange={(e) => setGuestInput(e.target.value)}
          />
          <Button disabled={!guestInput} onClick={onGuestAdd}>
            Add
          </Button>
        </div>
      </Form.Item>

      <div className="flex flex-wrap gap-5">
        {eventData.guests?.map((guest: string) => (
          <Tag key={guest} closable onClose={() => onGuestRemove(guest)}>
            {guest}
          </Tag>
        ))}
      </div>
      <div className="flex gap-10 justify-between">
        <Button onClick={() => navigate("/admin/events")}>Back</Button>
        <Button
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={
            !eventData.name || !eventData.description || !eventData.organizer || !eventData.guests
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default General;
