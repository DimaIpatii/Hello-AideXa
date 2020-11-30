const CHIPS_CHECKED = 'CHIPS_CHECKED';
const CHIPS_UNCHECKED = 'CHIPS_UNCHECKED';

const chipState = (state,action) => {
    if(action.type == CHIPS_CHECKED){
        return [...state,action.playload];
    }

    if(action.type === CHIPS_UNCHECKED){
        return state.filter(el => el.id !== action.playload.id);
    }
    return [action.playload];
}

export default chipState;