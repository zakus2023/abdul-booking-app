import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { Button, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getEvents } from "../../../../api-services/event-services";
import { Pen, Trash2 } from "lucide-react";
import { getDateTimeFormat } from "../../../../helpers/date-time-format";
import type { ColumnsType } from "antd/es/table";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents({ searchText: "", date: "" });
      setEvents(response.data);
    } catch (error) {
      message.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteEventHandler = async (id: string) => {
    try {
      setLoading(true);
      await deleteEvent(id);
      getData();
      message.success("Event deleted successfully");
    } catch (error) {
      message.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date and Time",
      dataIndex: "date",
      render: (_: any, row: any) => getDateTimeFormat(`${row.date} ${row.time}`),
      key: "date",
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      render: (date: any) => getDateTimeFormat(date),
      key: "createdAt",
    },
    {
      title: "Actions",
      render: (record: any) => (
        <div className="flex gap-5">
          <Trash2
            className="cursor-pointer text-red-700"
            size={16}
            onClick={() => deleteEventHandler(record._id)}
          />
          <Pen
            className="cursor-pointer text-green-700"
            size={16}
            onClick={() => navigate(`/admin/events/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Events" />
        <Button type="primary" onClick={() => navigate("/admin/events/create")}>
          Create Events
        </Button>
      </div>
      <Table dataSource={events} columns={columns} loading={loading} rowKey="_id" />
    </div>
  );
}

export default Events;
