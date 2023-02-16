import axios from 'axios'

export const fetchData=async()=>{
 const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    return res;
}