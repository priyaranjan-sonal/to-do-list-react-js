import React, { useEffect, useRef, useState } from 'react'
import list from '../assets/list.png'
import Todo_items from './Todo_items'


const Todo = () => {

  const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);
  const [editingId, setEditingId] = useState(0);
  const [editInput, setEditInput]=useState("");

  const inputref = useRef()

  const add =()=>{
    const inputText = inputref.current.value.trim();

    if (inputText ==="") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }
    setTodoList((prev)=>[...prev, newTodo]);
    inputref.current.value ="";
  }

  const editTodo = (id) =>{
    console.log(editingId)
    setEditingId(id)
    
  }

  const saveEdit = (i, newText) => {
    const targetTodo = todoList.find(todo => todo.id === i)
    targetTodo.text = newText
    setEditingId()
  }

  
  const deleteTodo = (id)=>{
    setTodoList((prevTodos)=>{
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }



  const toggle = (id) => {
    setTodoList((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if(todo.id === id){
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo;
      })
    })
  }

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList))
  },[todoList, editingId])


  return (
    <div className="bg-[#ffffff] shadow-lg shadow-neutral-700 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">


      {/*-----------------------title----------------------- */}
      <div className='flex items-centre mt-7 gap-2'>
        <img src={list} alt="" className='w-9 h-8'/>
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>


      {/*----------------------input box-------------------- */}

      <div className='flex items-center my-7 bg-slate-200 rounded-lg border-b-2 border-l-2 border-indigo-600 focus:outline-none'>
        <input ref={inputref} type="text" placeholder='Add your task' className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-gray-700 rounded-l-md'/>
        <button onClick={add} className='bg-blue-500 hover:bg-blue-600 border-none rounded-lg w-28 h-12 pl-1 mx-1 text-white text-lg font-medium'>ADD+</button>
      </div>

      {/* ----------------------Task Table with headings-------------------- */}
      <div className="bg-[#F5F5F5] p-4 rounded-lg shadow-md shadow-zinc-500 border border-slate-800 focus:outline-none">
      {todoList.length > 0 ? (
        <>
          <div className="flex gap-2 text-lg font-semibold mb-3">
            <div className='text-center w-8'>#</div>
            <div className='text-left w-64'>Task Name</div>
            <div className='text-right'>Actions</div>
          </div>

          {/*----------------------todo list-------------------- */}
          <div className=''>
            {todoList.map((item, index)=>{
              return <Todo_items key={index} text={item.text} id={item.id} isComplete={item.isComplete} editTodo={editTodo} deleteTodo={deleteTodo} toggle={toggle} editingId={editingId} saveEdit={saveEdit}/>

            })}
          </div>
        </>
        ) : (
          // If there are no tasks, display this message
          <div className="text-center text-gray-500 text-lg">
            There are no tasks
          </div>
        )}
      </div>

    </div>
  )
}

export default Todo
