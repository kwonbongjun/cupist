import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit'
  import { client } from '../../api/client'
  
  const usersAdapter = createEntityAdapter()
  
  const initialState = usersAdapter.getInitialState({
    status: 'idle',
    error: null,
  })
  
  export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/cupist/build/fakeApi/getUsers')    
    return response.data
  })
  export const likeUser = createAsyncThunk('users/likeUser', async (state, action) => {
    const response = await client.post('/cupist/build/fakeApi/like', state)    
    return response.data
  })
  const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        like(state, action) {
            const { destId, srcId } = action.payload
            const existingUser = state.entities[destId]
            if (existingUser) {
                existingUser.acceptList.push(srcId);
            }
        },
    },
    extraReducers(builder) {
        builder
          .addCase(fetchUsers.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            usersAdapter.upsertMany(state, action.payload)
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      },
  })
  export const { like } = usersSlice.actions
  export default usersSlice.reducer
  
  export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
  } = usersAdapter.getSelectors((state) => state.user)
  