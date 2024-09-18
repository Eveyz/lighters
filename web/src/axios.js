import axios from 'axios'

let token = localStorage.getItem("jwtToken");
const ax = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

export default ax
