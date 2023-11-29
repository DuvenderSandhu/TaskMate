const changeAlert=(state={},action)=>{
  if(action.type==='alert'){
      return action.payload
  }
  else{
      return state
  }
}


export default changeAlert;