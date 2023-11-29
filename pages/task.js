import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionCreators from '../State/index'

function Task(){
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  let user = useSelector(state => state.user)
  const dispatch = useDispatch();
  let data={
    title:taskTitle,
    desc:taskDescription,
    user:user
  }
  useEffect(()=>{
    let res= fetch('https://taskmate.moviesmovies.repl.co/api/addnote',{
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(res=>res.json()).then(res=>console.log(res))
  },[])
  const addTask =async (e) => { 
    e.preventDefault();
    let res = fetch('https://taskmate.moviesmovies.repl.co/api/addnote', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        res.success
          ? dispatch(actionCreators.alert({ type: "success", message: res.success }))
          : dispatch(actionCreators.alert({ type: "alert", message: res.alert }));
      });
    taskTitle="",
      taskDescription=""
    
    // Add your logic to handle task creation here.
  };
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-3xl font-semibold mb-4">Create Task</h2>

        <form onSubmit={addTask}>
          <div className="mb-4">
            <label htmlFor="taskTitle" className="block text-sm font-semibold text-gray-600">
              Task Title
            </label>
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="taskDescription" className="block text-sm font-semibold text-gray-600">
              Task Description
            </label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter task description"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default Task