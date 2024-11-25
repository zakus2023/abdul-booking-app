import axios from "axios";

export const registerUser = async (data: never) => {
  const res = await axios.post("/api/user/register", data);
  return res.data;
};

export const loginUser = async (data: never) => {
  const res = await axios.post("/api/user/login", data);
  return res.data;
};

export const getCurrentUser = async ()=>{
    const response = await axios.get("/api/user/current-user")
    return response.data
}

export const getAllUsers = async ()=>{
  const response = await axios.get('/api/user/all-users')
  return response.data
}

export const updateUserRole = async (data:any)=>{
  const response = await axios.put('/api/user/update-user', data)
  return response.data
}

export const verifyOldPassword = async (userId: string, oldPassword: string) => {
  const response = await axios.post('/api/user/verify-password', { userId, oldPassword });
  return response.data.isValid;
};