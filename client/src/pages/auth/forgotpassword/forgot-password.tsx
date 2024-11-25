// import { useState } from "react";
// import { Form, Input, Button, message } from "antd";
// //import { forgotPassword } from "../../../api-services/users-services";
// import WelcomeContent from "../../common/WelcomeContent";

// function ForgotPasswordPage() {
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values:any) => {
//     try {
//       setLoading(true);
//       const response = await forgotPassword(values.email);
//       message.success(response.message);
//     } catch (error:any) {
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
//       <Form layout="vertical" onFinish={onFinish} className="w-96">
//         <h1 className="text-2xl font-bold">Forgot Password</h1>
//         <Form.Item
//           name="email"
//           label="Email"
//           rules={[{ required: true, type: "email" }]}
//         >
//           <Input placeholder="Email" />
//         </Form.Item>
//         <Button type="primary" htmlType="submit" block loading={loading}>
//           Submit
//         </Button>
//       </Form>
//         </div>
//     </div>

    
 
    
//   );
// }

// export default ForgotPasswordPage;
