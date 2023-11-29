import { combineReducers } from "redux";
import changeuser from './changeuser'
import changeAlert from './changeAlert'
import EditModal from './EditModal'
const reducers = combineReducers({
  user:changeuser,
  alert:changeAlert,
  edit:EditModal
})
export default reducers;