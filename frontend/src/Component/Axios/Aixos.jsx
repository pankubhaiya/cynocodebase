import axios from "axios";

const instance = axios.create({
   
    baseURL: 'https://blushing-hospital-gown-foal.cyclic.app/'
  
});

export default instance;