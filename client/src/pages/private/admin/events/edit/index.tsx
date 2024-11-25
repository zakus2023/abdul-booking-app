import { useEffect, useState } from "react";
import PageTitle from "../../../../../components/page-title";
import EventForm from "../common/event-form";
import { message } from "antd";
import { getEventById } from "../../../../../api-services/event-services";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../components/Spinner";

function EditEventsPage() {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);
  const params: any = useParams();

  console.log(eventData);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);
      setEventData(response.data);
    } catch (error) {
      message.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <PageTitle title=" Edit Events" />
      </div>
      <EventForm initialData={eventData} type="edit"/>
    </div>
  );
}

export default EditEventsPage;
