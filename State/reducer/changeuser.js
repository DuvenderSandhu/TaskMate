const changeuser=(state="",action)=>{
  if(action.type==='changeuser'){
      return action.payload
  }
  else{
      return state
  }
}


export default changeuser;