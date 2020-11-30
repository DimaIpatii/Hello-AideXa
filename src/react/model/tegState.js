const TEG_CLICKED = 'TEG_CLICKED';
const TEG_REMOVE = 'TEG_REMOVE';

const tegState = (state, action) => {
    if(action.status == TEG_CLICKED){
        return [action.playload]
    }

    if(action.status == TEG_REMOVE){
        return []
    }
}


export default tegState;