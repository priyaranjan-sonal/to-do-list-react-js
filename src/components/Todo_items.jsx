import React, { useEffect, useRef, useState } from 'react'
import tick from '../assets/tick.png'
import delete_icon from '../assets/del.png'
import not_tick from '../assets/un_tick.png'
import edit from '../assets/edit.png'


const Todo_items = ({text, id, isComplete, editTodo, deleteTodo, toggle, editingId, saveEdit,}) => {
  const [inputValue, setInputValue] = useState()
  const editInput = useRef()

  useEffect(() => {
    setInputValue(text)
  },[text])

  return (
    <div className='flex items-center my-3 gap-2'>
      <div className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete ? tick : not_tick} alt="" className={`w-7 ${isComplete ? "mx-0.5 my-0.5 w-[24px]" : "w-7"}`} onClick={()=>{toggle(id)}}/>

        {id == editingId ? (<>
          <input className='pl-1 ml-3 w-48' value={inputValue} onChange={(e) => setInputValue(e.value)} type="text" ref={editInput} />
        </>):(<>
        <p className={`first-letter:uppercase text-slate-950 ml-4 text-[17px] break-normal ${isComplete ? "line-through text-slate-500" : ""}`}>
          {text}
        </p>
        </>)}
        

      </div>
      
      {id === editingId ? (<>
      <button onClick={() => saveEdit(id, editInput.current.value.trim())} className='bg-[#3ea8ff] hover:bg-[#3b8dff] border-2 border-stone-500 hover:border-2 hover:border-stone-950 pb-[2px] w-11 h-7 flex items-center justify-center rounded-[4px] font-medium'>
        Save
      </button>
      </>) : (<>
      <div className='hover:bg-[#ffe227] border-2 border-stone-500 bg-[#fffb27] hover:border-2 hover:border-stone-950 w-11 h-7 flex items-center justify-center rounded-[4px] font-medium'>
        <button onClick={()=>{editTodo(id)}} className='w-[29px] cursor-pointer'>Edit</button>
      </div>
      </>)}
      

      <div className='bg-[#ff4b4b] border-2 border-stone-500 hover:bg-[#ff2525] hover:border-2 hover:border-stone-950 w-8 h-7 flex items-center justify-center rounded-[4px]'>
        <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-[18px] cursor-pointer'/>
      </div>
        
      
    </div>
  )
}

export default Todo_items
