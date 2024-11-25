import { message } from "antd";
import { useEffect, useState } from "react";

import { getEvents } from "../../../api-services/event-services";
import EventCard from "./common/event-card";
import { EventType } from "../../../interfaces";
import Filters from "./common/filters";
import Spinner from "../../../components/Spinner";

function HomePage() {
  // const [user, setUser] = useState<any>('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchText: "",
    date: "",
  });

  
  
  //filterObj was added after impl the filter
  const getData = async (filtersObj:any) => {
    try {
      setLoading(true);
      //filterObj was added after impl the filter
      const response = await getEvents(filtersObj);
      setEvents(response.data);
    } catch (error) {
      message.error("failed to get data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData({searchText:'', date:""});
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="">
      <Filters filters={filters} setFilters={setFilters} onFilter={getData} />
      <div className="flex flex-col gap-7 mt-7">
        {events.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
