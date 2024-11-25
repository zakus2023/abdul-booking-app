import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { UserBookingType } from "../../../../interfaces";
import { Popconfirm, Table, message } from "antd";
import {
  cancelBooking,
  getUserBookings,
} from "../../../../api-services/bookings-service";
import {
  getDateTimeFormat,
} from "../../../../helpers/date-time-format";

function UserBookings() {
  const [bookings, setBookings] = useState<UserBookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserBookings();
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

  const onCancelBooking = async (booking: UserBookingType) => {
    try {
      setLoading(true);
      const payload = {
        eventId: booking.event._id,
        ticketTypeName: booking.ticketType,
        ticketsCount: booking.ticketsCount,
        bookingId: booking._id,
        paymentId: booking.paymentId,
      };
      await cancelBooking(payload);
      message.success("Booking cancelled successfully");
      getData();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "event",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Booked on",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) => getDateTimeFormat(createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (record: UserBookingType) => {
        if (record.status === "booked") {
          return (
            <Popconfirm
              title="Are you sure you want to cancel this booking?"
              onConfirm={() => onCancelBooking(record)}
              okText="Yes"
              cancelText="No"
            >
              <span className="text-red-500 cursor-pointer text-sm">
                Cancel
              </span>
            </Popconfirm>
          );
        } else {
          return "";
        }
      },
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
        pagination={false}
      />
    </div>
  );
}

export default UserBookings;
