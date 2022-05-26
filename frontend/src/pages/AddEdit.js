import React, {useState, useEffect} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';


const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);



  const { name, email, contact } = initialState;

  const history = useHistory();

  const {id} = useParams();

  useEffect(()=>{
    if (id) {
        getSingleUser(id);
    }
  }, [id])

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  }

  const addUser = async (data, id) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateUser = async (data) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }

      setTimeout(() => history.push("/"), 500);
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ 
      ...state, 
      [name]: value,
    });
  };


  return (
    <div style={{ marginTop: "100px" }}>
      <form
      style={{
        margin: "auto",
        padding: "5px",
        maxWidth: "400px",
        alignContent: "center",
        
      }}
      onSubmit={handleSubmit}
      
      >

        <label htmlFor="name"> Name</label>
        <input 
        type="text" 
        id="name" 
        name="name" 
        placeholder="Enter Name ..." 
        value={state && state.name}
        onChange={handleInputChange} 
       />
        
        <label htmlFor="email"> Email</label>
        <input 
        type="email" 
        id="email" 
        name="email" 
        placeholder="Enter Email ..." 
        value={state && state.email}
        onChange={handleInputChange} 
        />

        <label htmlFor="contact"> Contact</label>
        <input 
        type="number" 
        id="contact" 
        name="contact" 
        placeholder="Enter Contact +993 ..." 
        value={state && state.contact}
        onChange={handleInputChange} 
         />

        <input type="submit" value={id ? "Update" : "Add"} />

      </form>
        
    </div>
  )
}

export default AddEdit
