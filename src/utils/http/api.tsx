import axios from "axios";


const token = JSON.parse(localStorage.getItem("token") || '') ;

const authAxios= axios.create({
  baseURL:'http://localhost:8080',
   headers: {
    Authorization:`Bearer ${token}`
   }
})
export default authAxios;