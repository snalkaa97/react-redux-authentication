/**
 * Template standar Reducer buat Redux Toolkit.
 */

 import {createSlice} from '@reduxjs/toolkit';
 import apiClient from '../../services/apiClient';

 /**
  * Nama Reducer.
  */
 const name = 'post';
 
 /**
  * State awal. Biasanya kosong, false, 0, dll, tapi balik lagi sesuai kebutuhan.
  */
 const initialState = [];
 
 /**
  * Daftar fungsi reducers buat CRUD initial state.
  * Bebas mau bikin fungsi apa aja sesuai kebutuhan.
  * Cuma yang perlu diperhatikan saat CRUD, usahakan lakukan proses CRUD secara "immutable", artinya kita gak boleh sembarang ubah state secara langsung, tapi kita harus bikin copyan/duplikatnya dulu baru kita bisa ubah dari situ. https://css-tricks.com/understanding-immutability-in-javascript
  * Panduan yang biasa aku pakai: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript#immutable-array-operations
  */
 const reducers =
 {
   getAllPost: (state, action) => {
    state = action.payload;
   },
   addPost: (state, action) =>
   {
     state = [...state, action.payload];
   },
   updatePost: (state, action) =>
   {
     state = state.map((post) => (post.id === action.payload.id ? action.payload : post))
   },
   deletePost: (state, action) =>
   {
     console.log(action);
     const PostIndex = state.map((post) => post.id).indexOf(action.payload);
 
     state = [...state.slice(0, PostIndex), ...state.slice(PostIndex + 1)];
   },
   fetchPost: (state, action) => {
     apiClient.get('/api/post',{
        headers: {
            'x-access-token': action.payload
        }
     })
     .then((response)=>{
        // console.log(response);
        state = response.data;
        console.log(state.data)
     })
     .catch(err=>console.error(err));
   },
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
 export const {getAllPost, addPost, updatePost, deletePost, fetchPost} = slice.actions;
 
 export default slice.reducer;
 