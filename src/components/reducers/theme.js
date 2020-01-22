import {createStore} from 'redux';

const initial_state = {
    themeList: [{
        id:1,
        name:"dark",
    },{
        id:2,
        name:'light',
    }],

    actualTheme:"light",
}

const reducer = (state = initial_state, action)=>{
    return state;
}

const ThemeStore = createStore(reducer);

export default ThemeStore;