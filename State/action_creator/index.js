export const changeuser = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'changeuser',
      payload: user
    })
  }
}


export const alert = (obj) => {
  return (dispatch) => {
    dispatch({
      type: 'alert',
      payload: obj
    })
  }
}

export const EditModal = (status) => {
  return (dispatch) => {
    dispatch({
      type: 'EditModal',
      payload: status
    })
  }
}
