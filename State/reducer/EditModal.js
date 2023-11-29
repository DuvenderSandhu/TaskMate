const EditModal=(state=false,action)=>{
  if(action.type==='EditModal'){
      return action.payload
  }
  else{
      return state
  }
}


export default EditModal;