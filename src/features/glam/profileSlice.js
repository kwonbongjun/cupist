import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const profileAdapter = createEntityAdapter()

const initialState = profileAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchProfile = createAsyncThunk('users/fetchProfile', async () => {
  const response = await client.get('/cupist/build/fakeApi/getProfile')    
  return response.data
})
export const decisionUser = createAsyncThunk('users/decisionUser', async (state, action) => {
  const response = await client.post('/cupist/build/fakeApi/decision', state)    
  return response.data
})
export const saveToServer = createAsyncThunk('users/saveToServer', async (state, action) => {
  const response = await client.post('/cupist/build/fakeApi/save', state)    
  return response.data
})
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    decision(state, action) {
      const { destId, srcId } = action.payload
      const existingProfile = state.entities[srcId];
      if (existingProfile)
          existingProfile.decisionObj[destId] = true;
    },
    uploadImg(state, action) {
      const { id, file, index } = action.payload
      const existingProfile = state.entities[id];
      if (existingProfile)
          existingProfile.imgs[index] = file;
    },
    save(state, action) {
      const { id, myData } = action.payload
      let existingProfile = state.entities[id];
      if (existingProfile) {
        existingProfile.address = myData.address;
        existingProfile.body = myData.body;
        existingProfile.company = myData.company;
        existingProfile.job = myData.job;
        existingProfile.school = myData.school;
        existingProfile.education = myData.education;
        existingProfile.personality = myData.personality;
        existingProfile.religion = myData.religion;
        existingProfile.alcohol = myData.alcohol;
        existingProfile.smoking = myData.smoking;
      }
    },
  },
  extraReducers(builder) {
      builder
        .addCase(fetchProfile.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          profileAdapter.upsertMany(state, action.payload)
        })
        .addCase(fetchProfile.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    },
})
export const { decision, uploadImg, save } = profileSlice.actions
export default profileSlice.reducer

export const {
  selectAll: selectAllProfile,
  selectById: selectProfileById,
  selectIds: selectProfileIds,
} = profileAdapter.getSelectors((state) => state.profile)
