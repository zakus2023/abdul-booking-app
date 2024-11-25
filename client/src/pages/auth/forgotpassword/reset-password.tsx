// import { useState } from "react";
// import { Form, Input, Button, message } from "antd";
// import { useParams, useNavigate } from "react-router-dom";
// // import { resetPassword } from "../../../api-services/users-services";
// import WelcomeContent from "../../common/WelcomeContent";

// function ResetPasswordPage() {
//   const [loading, setLoading] = useState(false);
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const onFinish = async (values: any) => {
//     try {
//       setLoading(true);
//       const response = await resetPassword(token, values.password);
//       message.success(response.message);
//       navigate("/login");
//     } catch (error: any) {
//       message.error(error.response?.data.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2">
//       <div className="col-span-1 lg:flex hidden">
//         <WelcomeContent />
//       </div>
//       <div className="h-screen flex items-center justify-center">
//         <Form layout="vertical" onFinish={onFinish} className="w-96">
//           <h1 className="text-2xl font-bold">Reset Password</h1>
//           <Form.Item
//             name="password"
//             label="New Password"
//             rules={[{ required: true, min: 6 }]}
//           >
//             <Input.Password placeholder="New Password" />
//           </Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading}>
//             Submit
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default ResetPasswordPage;
