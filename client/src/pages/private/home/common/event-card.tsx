import { EventType } from "../../../../interfaces";
import { Button } from "antd";
import { MapPin, Timer } from "lucide-react";
import { getDateTimeFormat } from "../../../../helpers/date-time-format";
import { useNavigate } from "react-router-dom";

function EventCard({ event }: { event: EventType }) {
  const navigate = useNavigate();
  const mainImage = event.media[0];
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 border-solid border-gray-200 border items-center gap-5">
      <div className="cols-span-1">
        <img
          src={mainImage}
          alt={event.name}
          className="w-full h-56 object-cover rounded-l"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-3 p-3">
        <h1 className="text-primary text-lg font-bold">{event.name}</h1>
        <p className="text-gray-600 text-sm line-clamp-3">
          {event.description}...
        </p>
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="bg-gray-200 p-1 rounded flex flex-col gap-1">
            <div className="flex gap-2 items-center p-2">
              <MapPin size={16} />
              <p className="text-xs">
                {event.address} {event.city} {event.postalcode}
              </p>
            </div>
            <div className="flex gap-2 items-center p-2 items-center">
              <Timer size={16} />
              <p className="text-xs">
                {getDateTimeFormat(`${event.date} ${event.time}`)}{" "}
              </p>
            </div>
          </div>
          <Button
            type="primary"
            onClick={() => navigate(`/event/${event._id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
