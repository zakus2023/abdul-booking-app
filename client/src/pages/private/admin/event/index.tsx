import { useEffect, useState } from "react";
import { EventType } from "../../../../interfaces";
import { getEventById } from "../../../../api-services/event-services";
import { useParams } from "react-router-dom";
import { Image, message } from "antd";
import Spinner from "../../../../components/Spinner";
import { MapPin, Timer } from "lucide-react";
import {
  getDateFormat,
  getDateTimeFormat,
} from "../../../../helpers/date-time-format";
import TicketSelection from "./ticket-selection";

function EventInfoPage() {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const params: any = useParams();

  

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);
      setEventData(response.data);
    } catch (error) {
      message.error("Failed to fetch the event");
    } finally {
      setLoading(false);
    }
  };

  const renderEventProperties = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-600 font-bold">{value}</span>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    eventData && (
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-gray-500">{eventData?.name}</h1>
          <div className="flex gap-10">
            <div className="flex gap-1">
              <MapPin size={14} />
              <span className="text-gray-500 text-xs text-gray-500 items-center">
                {eventData?.address} {eventData?.city} {eventData?.postalcode}
              </span>
            </div>
            <div className="flex gap-1">
              <Timer size={14} />
              <span className="text-gray-500 text-xs text-gray-500 items-center">
                {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-5">
          {eventData?.media.map((media, index) => (
            <Image
              src={media}
              height={220}
              className="object-cover rounded"
              key={index}
            />
          ))}
        </div>
        <div className="mt-7">
          <p className="text-gray-600 text-sm">{eventData?.description}</p>
        </div>
        <div className="grid grid-cols-1 md:gris-cols-2 lg:grid-cols-3 p-3 bg-gray-200 mt-7 gap-4">
          {renderEventProperties("Organizer", eventData?.organizer)}
          {renderEventProperties("Address", eventData?.address)}
          {renderEventProperties("City", eventData?.city)}
          {renderEventProperties("Postal Code", eventData?.postalcode)}
          {renderEventProperties("Date", getDateFormat(eventData.date))}
          {renderEventProperties("Time", eventData.time)}
          <div className="col-span-3">
            {renderEventProperties("Guests", eventData?.guests.join(", "))}
          </div>
        </div>
        <div className="mt-7">
          <TicketSelection eventData={eventData} />
        </div>
      </div>
    )
  );
}

export default EventInfoPage;
