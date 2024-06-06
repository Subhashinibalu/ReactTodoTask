import React, { useState } from 'react';
import Input from './Components/Input';


const App = () => {

    const [todo,setTodo] = useState([
      {
        id:1,
        title:"Office Task1",
        description:"this is the description for my First task",
        status:"false"
      },
      {
        id:2,
        title:"Office Task2",
        description:"this is the description for my Second task",
        status:"true"
      },
      {
        id:3,
        title:"Office Task3",
        description:"this is the description for my Third task",
        status:"false"
      },
    ]);
const addTodo=(newTitle,newDescription,newStatus)=>{
  let data = {
    id:todo.length+1,
    title:newTitle,
    description:newDescription,
    status:newStatus

  }

  setTodo([...todo,data])
  
  console.log("added")
}
console.log(todo)


const deleteTodo=(id)=>{
  setTodo(todo.filter((ele)=>ele.id !== id))
}



  return (
    <div>
    
             <Input addTodo={addTodo} todo={todo} setTodo={setTodo} deleteTodo={deleteTodo}/>
      
    </div>
  );
};

export default App;