import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import actionCreators from '../State/index'

function Notes(){
  const initialData ={
    title:"",
    description:"",
    label:"",
  }
    const router= useRouter()
  const [newTitle, setNewTitle] = useState(initialData.title);
  const [newDescription, setNewDescription] = useState(initialData.description);
  const [newLabel, setNewLabel] = useState(initialData.label);
  const [tempid, setTempid] = useState("");
  const [updateData, setUpdateData] = useState(0);

  const handleSave = () => {
    let data={
      user:user,
      id:tempid,
      title:newTitle,
      desc:newDescription,
      label:newLabel,
    }
    let res=  fetch('https://taskmate.moviesmovies.repl.co/api/edit',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(e=>e.json().then(data=>{
      if(data.success){
        dispatch(actionCreators.alert({type:"success",message:data.success}))

      }
      else{
        dispatch(actionCreators.alert({type:"alert",message:data.alert}))

      }
      dispatch(actionCreators.EditModal(false))
    }))
  
  }
  function onClose (){
    dispatch(actionCreators.EditModal(false))

  }
    const [tasks, setTasks] = useState([]);
    const [temptask, setTemptask] = useState([]);
  let user = useSelector(state => state.user)
  let isOpen = useSelector(state => state.edit)
  const dispatch = useDispatch();
  let data= {
    user:user
  }
    useEffect(()=>{
  if(!user){
    router.push('/login')
  }
      let res=  fetch('https://taskmate.moviesmovies.repl.co/api/tasks',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then(e=>e.json().then(data=>setTasks(data.tasks||[])))
      // console.log(res)
    },[isOpen,updateData])
    // Add more tasks as needed


  const markAsRead = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isRead: true } : task
      )
    );
  };
  const toggleComplete = (taskId,e) => {

    console.log(e)
    let data={
      user:user,
      id:taskId,
        marked:e
    }
    console.log(data)

    let res=  fetch('https://taskmate.moviesmovies.repl.co/api/edit',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(e=>e.json().then(data=>{
      if(data.alert){
        dispatch(actionCreators.alert({type:"alert",message:data.alert}))
      }

      setUpdateData(!updateData)
  }))};
  const editTask = (taskId) => {
    dispatch(actionCreators.EditModal(true))
    setTempid(taskId)
    let res=  fetch('https://taskmate.moviesmovies.repl.co/api/gettask',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:taskId})
    }).then(e=>e.json().then(data=>{
      if(data.success){
        setNewTitle(data.success[0].title)
        setNewDescription(data.success[0].desc)
        setNewLabel(data.success[0].label)
      }
      else{
        dispatch(actionCreators.alert({type:"alert",message:finaldata.alert}))

      }
      
    }))
    
  };
  // const sortedTasks = [...tasks].sort((a, b) => (a.isComplete ? 1 : -1));
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch('https://taskmate.moviesmovies.repl.co/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId, user: user }),
      });
      const data = await response.json();

      if (data.success) {
        // Task successfully deleted
        dispatch(actionCreators.alert({ type: 'success', message: data.success }));
        setUpdateData(!updateData)
      } else {
        // Failed to delete task
        dispatch(actionCreators.alert({ type: 'alert', message: data.alert }));
        setUpdateData(!updateData)
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error deleting task:', error);
      dispatch(actionCreators.alert({ type: 'alert', message: 'Error while deleting task.' }));
      setUpdateData(!updateData)

    }
  };
  return (
    <div className="container mx-auto mt-8">
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

          <div className="mb-4">
            <label htmlFor="newTitle" className="block text-sm font-semibold text-gray-600">
              New Title
            </label>
            <input
              type="text"
              id="newTitle"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter new title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newDescription" className="block text-sm font-semibold text-gray-600">
              New Description
            </label>
            <textarea
              id="newDescription"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter new description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newLabel" className="block text-sm font-semibold text-gray-600">
              New Label
            </label>
            <input
              type="text"
              id="newLabel"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter new label"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-4">Tasks to Do</h1>

      {tasks.length===0?<div className="container mx-auto mt-8 text-center">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">No Notes Found</h2>
            <p className="text-gray-600">It seems like there are no notes available.</p>
            {/* Add any additional message or instructions based on your requirements */}
          </div>
        </div>:tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded mb-4 shadow-md flex items-center justify-between ${
            task.isCompleted ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={(e) => toggleComplete(task._id, e.target.checked)}
            />
            <div>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-500">{task.date}</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-500">{task.label}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => editTask(task._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Notes