import axios from "axios";

const instance = axios.create({
   
    baseURL: 'https://relieved-mite-dirndl.cyclic.app/'
  
});

export default instance;