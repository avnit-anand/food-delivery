import './List.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log("list kkk"+response.data.data)
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Fetching list failed")
    }
  }

  const removeItem = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    console.log(response);
    fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => { removeItem(item._id) }} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
