/**
 * Template standar Reducer buat Redux Toolkit.
 */

 import {createSlice} from '@reduxjs/toolkit';

 /**
  * Nama Reducer.
  */
 const name = 'auth';
 
 /**
  * State awal. Biasanya kosong, false, 0, dll, tapi balik lagi sesuai kebutuhan.
  */
 let initialState =
 {
    auth: false,
    userInfo:{},
    userToken: null,
    error: null,
    success: false,
 };
 
 /**
  * Daftar fungsi reducers buat CRUD initial state.
  * Bebas mau bikin fungsi apa aja sesuai kebutuhan.
  * Cuma yang perlu diperhatikan saat CRUD, usahakan lakukan proses CRUD secara "immutable", artinya kita gak boleh sembarang ubah state secara langsung, tapi kita harus bikin copyan/duplikatnya dulu baru kita bisa ubah dari situ. https://css-tricks.com/understanding-immutability-in-javascript
  * Panduan yang biasa aku pakai: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript#immutable-array-operations
  */
 const reducers =
 {
    setUser: (state, action) => {
        state = action.payload;
    },
    setUserToken: (state, action) => {
        state.auth = true;
        state.userToken = action.payload;
    },
    setCredentials: (state, action) => {
        state.userInfo = action.payload;
    },
    logout: (state) => {
        localStorage.removeItem('userToken') // deletes token from storage
        state.auth = false
        state.userInfo = null
        state.userToken = null
        state.error = null
      },
//    addPost: (state, action) =>
//    {
//      state.auth = [...state.auth, action.payload];
//    },
//    updatePost: (state, action) =>
//    {
//      state.auth = state.auth.map((post) => (post.id === action.payload.id ? action.payload : post))
//    },
//    deletePost: (state, action) =>
//    {
//      console.log(action);
//      const PostIndex = state.auth.map((post) => post.id).indexOf(action.payload);
 
//      state.auth = [...state.auth.slice(0, PostIndex), ...state.auth.slice(PostIndex + 1)];
//    }
 };
 
 /**
  * Buat slice, ini template juga.
  */
 const slice = createSlice(
 {
   name: name,
   initialState: initialState,
   reducers: reducers
 });
 
 /**
  * Terus kita export semua fungsi reducers yang udah kita buat tadi.
  */
 export const {setUser, logout, setUserToken, setCredentials} = slice.actions;
 
 export default slice.reducer;
 