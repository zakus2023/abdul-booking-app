import { useState } from "react";
import userGlobalStore, { UserStoreType } from "../../../store/users-store";
import PageTitle from "../../../components/page-title";
import { getDateTimeFormat } from "../../../helpers/date-time-format";
import { Button, Form, Input, message } from "antd";
import { updateUserRole, verifyOldPassword } from "../../../api-services/users-services";

function ProfilePage() {
  const { currentUser, updateUser }: UserStoreType = userGlobalStore() as UserStoreType;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!currentUser) return null;

  const renderUserProperties = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-600 font-bold">{value}</span>
      </div>
    );
  };


  const handleFormSubmit = async (data: any) => {
    try {
      if (data.oldPassword || data.newPassword || data.confirmNewPassword) {
        const isOldPasswordValid = await verifyOldPassword(currentUser._id, data.oldPassword);
        if (!isOldPasswordValid) {
          message.error("Old password is incorrect");
          return;
        }
        if (data.newPassword !== data.confirmNewPassword) {
          message.error("New passwords do not match");
          return;
        }
        // Update user password
        await updateUserRole({ userId: currentUser._id, password: data.newPassword });
      }
      
      // Update other user details
      const editedUser = await updateUserRole({ 
        userId: currentUser._id, 
        name: data.name, 
        email: data.email 
      });
      
      updateUser(editedUser);
      setIsEditing(false);
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("An error occurred while updating the profile");
    }
  };


  return (
    <div>
      <PageTitle title="My Profile" />
      {isEditing ? (
        <Form
          layout="vertical"
          initialValues={{
            _id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
          }}
          onFinish={handleFormSubmit}
        >
          <Form.Item label="User ID" name="_id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Old Password" name="oldPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item label="New Password" name="newPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: false, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            {renderUserProperties("User ID", currentUser?._id)}
            {renderUserProperties("Name", currentUser?.name)}
            {renderUserProperties("Email", currentUser?.email)}
            {renderUserProperties(
              "Member Since",
              getDateTimeFormat(currentUser.createdAt)
            )}
            {renderUserProperties(
              "Status",
              currentUser.isActive ? "Active" : "Inactive"
            )}
            {renderUserProperties(
              "Role",
              currentUser.isAdmin ? "Admin" : "User"
            )}
          </div>
          <div className="flex justify-start mt-5">
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
