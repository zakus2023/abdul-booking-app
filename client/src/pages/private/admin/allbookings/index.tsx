import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { UserBookingType } from "../../../../interfaces";
import { Table, message } from "antd";
import { getAllBookings } from "../../../../api-services/bookings-service";
import { getDateTimeFormat } from "../../../../helpers/date-time-format";

function AdminBookings() {
  const [bookings, setBookings] = useState<UserBookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    {
        title: "User",
        dataIndex: "user",
        key: "user",
        render: (event: any) => event.name,
      },
    {
      title: "Event Date and Time",
      dataIndex: "event",
      key: "event",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`),
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
    },
    {
      title: "Quantity",
      dataIndex: "ticketsCount",
    },
    {
      title: "Total Amount",
      dataIndex: "totalPrice",
    },
    
    {
      title: "Booked on",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) => getDateTimeFormat(createdAt),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
  ];

  return (
    <div>
      <PageTitle title="Bookings" />
      <Table
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
        
      />
    </div>
  );
}

export default AdminBookings;
