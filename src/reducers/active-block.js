const activeBlock = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_BLOCK':
      return Object.assign({}, action.block);
    case 'DISACTIVATE_BLOCK':
      return {};
    case 'UPDATE_BLOCK_STYLES':
      return Object.assign({}, state, { styles: action.properties });
    default:
      return state;
  }
};

export default activeBlock;