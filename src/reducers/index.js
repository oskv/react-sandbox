import { combineReducers } from 'redux'
import rows from './rows'
import activeBlock from './active-block'

export default combineReducers({
  rows,
  activeBlock,
})