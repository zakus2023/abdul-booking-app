import { useEffect, useState } from "react";
import { UserType } from "../../../../interfaces";
import { Table, message } from "antd";
import {
  getAllUsers,
  updateUserRole,
} from "../../../../api-services/users-services";
import {
  
  getDateTimeFormat,
} from "../../../../helpers/date-time-format";
import PageTitle from "../../../../components/page-title";

function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUser = async (data: any) => {
    try {
      setLoading(true);
      updateUserRole(data);
      message.success("User updated successfully");
      getData();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns: any = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Member Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean, row: UserType) => {
        return (
          <select
            value={isAdmin ? "admin" : "user"}
            className="border border-solid border-gray-300"
            onChange={(e) => {
                const roleUpdated = e.target.value === 'admin'
                updateUser({userId: row._id, isAdmin: roleUpdated})
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        );
      },
    },
    {
        title: "Status",
        dataIndex: "isActive",
        key: "isActive",
        render: (isActive: boolean, row: UserType) => {
          return (
            <select
              value={isActive ? "active" : "inactive"}
              className="border border-solid border-gray-300"
              onChange={(e) => {
                  const statusUpdated = e.target.value === 'active'
                  updateUser({userId: row._id, isActive: statusUpdated})
              }}
            >
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
          );
        },
      },
  ];

  return (
    <div>
      <PageTitle title="Users" />
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default UsersPage;
