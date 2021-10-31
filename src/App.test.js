import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Profile from './features/glam/Profile'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { selectAllProfile, fetchProfile} from './features/glam/profileSlice'
// export const handlers = [
//   rest.get('/fakeApi/getProfile', function (req, res, ctx) {
//     return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(db.profile.getAll()))
//   }),
// ]
// const server = setupServer(...handlers)

// // Enable API mocking before tests.
// beforeAll(() => server.listen())

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers())

// // Disable API mocking after the tests are done.
// afterAll(() => server.close())
// const thunk =
//   ({ dispatch, getState }) =>
//   next =>
//   action => {
//     if (typeof action === 'function') {
//       return action(dispatch, getState)
//     }

//     return next(action)
//   }
//   const create = () => {
//     const stores = {
//       getState: jest.fn(() => ({})),
//       dispatch: jest.fn()
//     }
//     const next = jest.fn()
  
//     const invoke = action => thunk(stores)(next)(action)
  
//     return { stores, next, invoke }
//   }
  // const { stores, invoke } = create()
  // invoke((dispatch, getState) => {
  //   dispatch(fetchProfile())
  //   getState()
  // })
test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/글램/i);
  expect(linkElement).toBeInTheDocument();
});
// test('profile', async () => {
//   store.dispatch(fetchProfile())
//   render(<Provider store={store}>
//     <Profile></Profile>
//   </Provider>)
//   //  const { stores, invoke } = create()
//   //  invoke((dispatch, getState) => {
//   //   // dispatch(fetchProfile())
//   //    getState()
//   //  })

//    const el = await screen.getByTestId('btnfile');
//     await expect(el).toBeInTheDocument()
// })
