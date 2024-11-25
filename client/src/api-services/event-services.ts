import axios from "axios";

export const createEvent = async (data: any) => {
  const response: any = axios.post("/api/event/create-event", data);
  return response.data;
};

//filterObj was added after impl the filter
export const getEvents = async (filters: any) => {
  // const response: any = await axios.get("/api/event/get-events"); it was like this
  //?search... was added after impl the filter
  const response: any = await axios.get(
    `/api/event/get-events?searchText=${filters.searchText}&date=${filters.date}`
  );
  return response.data;
};

export const getEventById = async (id: string) => {
  const response: any = await axios.get(`/api/event/get-event/${id}`);
  return response.data;
};

export const updateEvent = async (id: string, data: any) => {
  const response: any = await axios.put(`/api/event/update-event/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response: any = await axios.delete(`/api/event/delete-event/${id}`);
  return response.data;
};
