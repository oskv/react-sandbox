const activeBlock = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_BLOCK':
      return Object.assign({}, action.block);
    case 'DISACTIVATE_BLOCK':
      return {};
    case 'UPDATE_BLOCK_STYLES':
      return Object.assign({}, state, { styles: action.properties });
    case 'UPDATE_BLOCK_OPTIONS':
      const newOptions = Object.assign({}, state.data.options, action.options);
      const newBlockData = Object.assign({}, state.data, { options: newOptions});
      return Object.assign({}, state, { data: newBlockData });
    default:
      return state;
  }
};

export default activeBlock;