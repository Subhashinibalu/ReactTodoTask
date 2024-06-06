import React, { useEffect, useState } from "react";
import "./Input.css"

const Input = ({ addTodo, todo, setTodo, deleteTodo }) => {
  const [status, setStatus] = useState("false");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filtervalue, setFiltervalue] = useState('All')
  const [filteredTodos, setFilteredTodos] = useState([])
useEffect(()=>{
  if(filtervalue=="All"){
    setFilteredTodos(todo)
  }
  else if(filtervalue=="Completed"){
    const completedTodo = todo.filter(ele=>ele.status=='true')
    setFilteredTodos(completedTodo)
  }
  else if(filtervalue=="notCompleted"){
    const notcompletedTodo = todo.filter(ele=>ele.status=='false')
    setFilteredTodos(notcompletedTodo)
  }
},[filtervalue,todo])

  const handleSubmit = () => {
    if(title !=='' && description!==''){
      addTodo(title, description,status);
    }
    else{
      alert("Title and Description required")
    }
    setTitle("");
    setDescription("");
  };
  const handleEdit = (title, description, editId) => {
    setIsEditing(true);
    setEditId(editId);

    setTitle(title);
    setDescription(description);
  };

  const handleUpdate = () => {
    const updatedtodo = todo.map((ele) => {
      if (ele.id == editId) {
        return { ...ele, title, description };
      }
      return ele;
    });
    setTodo(updatedtodo);
    setEditId(null);
    setIsEditing(false);
    setTitle("");
    setDescription("");
  };

  const handleStatus=(id,status)=>{
    let updatedStatus =  todo.map((ele) => {
      if (ele.id == id) {
        return { ...ele, status:status };
      }
      return ele;
    });
    setTodo(updatedStatus)
  }
  return (
    <div>
      <h4 className="text-center mt-5 header">My todo</h4>
      <div className="row d-flex justify-content-center align-items-center mt-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo Name"
          className="col-3 ms-1 p-2 border-success-subtle"
          style={{borderRadius:"5px"}}
          required
        ></input>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo Description"
          className="col-3 ms-3 p-2 border-success-subtle"
          style={{borderRadius:"5px"}}
          required
        ></input>
        {isEditing ? (
          <button
            className="btn col-1 ms-3 bg-success text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="btn col-1 ms-3 bg-success text-white"
            onClick={handleSubmit}
          >
            Add Todo
          </button>
        )}
      </div>


      <div  className="todocenter d-flex   justify-content-between ms-5 me-3 p-5">

<h5 className="fw-bold">My Todos</h5>
<label ><span className="fw-bold fs-5">Status Filter :&nbsp;&nbsp;</span> 
            <select name="status" id="filtervalue" value={filtervalue} onChange={(e)=>setFiltervalue(e.target.value)} className="bg-danger p-1 " style={{border:"none", width:"25%"}}  >
              <option
                value="All"
                className="bg-danger color-white"
                
              >
                All
              </option>
              <option
                value="Completed"
                className="bg-success color-white"
                
              >
                Completed
              </option>
              <option
                value="notCompleted"
                className="bg-danger color-white "
                
              >
                Not-Completed
              </option>
            </select>
            </label>
</div>  


<div className="container">
<div className="row row-cols-lg-3   row-cols-md-2 row-cols-sm-1 d-flex justify-content-between  ">
        {filteredTodos.map((element, index) => {
          return (
            <div key={element.id}>
              <div className="card-body card p-3 mt-3" style={{width:"24rem"}}>
                <p className="card-title ">Name : {element.title}</p>

                <p className="card-subtitle mt-1 ">
                  Description : {element.description}
                </p>
                <div className="row mt-2 mb-3">
                  <span>
                    <label>Status &nbsp; </label>{" "}
                    <select name="status" id="status" style={{border:"none"}} className={element.status=='false'?'bg-danger  text-white p-2 ':'bg-success p-2 text-white'}  value ={element.status} onChange={(e)=>handleStatus(element.id,e.target.value)}>
                      <option
                        value="false"
                        className="bg-danger " 
                        
                      >
                        Not-Completed
                      </option>
                      <option
                        value="true"
                        className="bg-success "
                        
                      >
                        Completed
                      </option>
                    </select>
                  </span>
                </div>

                <div className="row col-12 d-flex justify-content-end mt-5 mb-1">
                  <button
                    className="btn btn-success col-3 me-3  "
                    onClick={() =>
                      handleEdit(element.title, element.description, element.id)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger  col-3 me-1"
                    onClick={() => deleteTodo(element.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
</div>







     
    </div>
  );
};

export default Input;
