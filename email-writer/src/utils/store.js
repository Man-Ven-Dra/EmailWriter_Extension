import {configureStore} from '@reduxjs/toolkit'
import searchSlice from './searchSlice';
import loadingSlice from './loadingSlice';


const store = configureStore({
    reducer: {
        search: searchSlice,
        loading: loadingSlice,
    }
});

export default store;