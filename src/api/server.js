import { rest, setupWorker } from 'msw'
import { factory, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'

import { Server as MockSocketServer } from 'mock-socket'

import userData, { myData}  from '../data/data.js'

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 500

/* MSW Data Model Setup */
export const db = factory({
  user: {
    id: primaryKey(nanoid),
    name: String,
    img: String,
    userId: String,
    age: Number,
    job: String,
    address: String,
    height: String,
    education: String,
    introduce: String,
    acceptList: Array,
  },
  profile: {
    id: primaryKey(nanoid),
    name: String,
    imgs: Array,
    userId: String,
    age: Number,
    job: String,
    address: String,
    height: String,
    education: String,
    introduce: String,
    sex: String,
    birth: String,
    body: String,
    company: String,
    school: String,
    personality: String,
    religion: String,
    alcohol: String,
    smoking: String,
    blood: String,
    race: String,
    charmingPoint: Array,
    interestedList: Array,
    lifeStyleList: Array,
    decisionObj: Object,
    acceptList: Array
    }
})

for (let j = 0; j < userData.length; j++) {
    db.user.create(userData[j]);
}
db.profile.create(myData);

const serializeUsers = (user) => ({
  ...user,
})

/* MSW REST API Handlers */

export const handlers = [
  rest.get('/fakeApi/getUsers', function (req, res, ctx) {
    const user = db.user.getAll().map(serializeUsers)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(db.user.getAll()))
  }),
  rest.get('/fakeApi/getProfile', function (req, res, ctx) {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(db.profile.getAll()))
  }),
  rest.post('/fakeApi/like', (req, res, ctx) => {
    const destId = req.body.destId
    const srcId = req.body.srcId
    const user = db.user.findFirst({
      where: { id: { equals: destId } },
    })
    
    const updatedUser = db.user.update({
        where: { id: { equals: destId } },
        data: {
            acceptList: [...user.acceptList, srcId],
        },
      })
    const profile = db.profile.findFirst({
        where: { id: { equals: srcId } },
    })
    const updatedProfile = db.profile.update({
        where: { id: { equals: srcId } },
        data: {
            name: '123213',
            decisionObj: {
                ...profile.decisionObj,
                a:1,
                [destId]: true,
            },
        },
    })
    console.log(user,profile);
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.json({user:serializeUsers(updatedUser), profile:serializeUsers(updatedProfile)}),
      )
  }),
  rest.post('/fakeApi/decision', (req, res, ctx) => {
    const destId = req.body.destId
    const srcId = req.body.srcId
    const profile = db.profile.findFirst({
        where: { id: { equals: srcId } },
    })
    const updatedProfile = db.profile.update({
        where: { id: { equals: srcId } },
        data: {
            decisionObj: {
                ...profile.decisionObj,
                [destId]: true,
            },
        },
    })
    console.log(updatedProfile);
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.json(serializeUsers(updatedProfile)),
      )
  }),
  rest.post('/fakeApi/save', (req, res, ctx) => {
    const myData = req.body.myData
    const srcId = req.body.id
    const profile = db.profile.findFirst({
      where: { id: { equals: srcId } },
    })
    const updatedProfile = db.profile.update({
        where: { id: { equals: srcId } },
        data: myData
    })
    console.log(updatedProfile);
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.json(serializeUsers(updatedProfile)),
      )
    }),
]

export const worker = setupWorker(...handlers)
// worker.printHandlers() // Optional: nice for debugging to see all available route handlers that will be intercepted

/* Mock Websocket Setup */

const socketServer = new MockSocketServer('ws://https://kwonbongjun.github.io/cupist/build/#/')

let currentSocket

socketServer.on('connection', (socket) => {
  currentSocket = socket

  socket.on('message', (data) => {
    const message = JSON.parse(data)

    switch (message.type) {
      case 'notifications': {
        const since = message.payload
        break
      }
      default:
        break
    }
  })
})