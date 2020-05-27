import { handleActions } from 'redux-actions'
import * as actions from './actions'

let initState = {
  room: null,
  stream: {
    url: '',
  },
  dj: '',
  pins: [],
  participants: [],
}

const roomReducer = handleActions(
  {
    // Set Stream URL
    [actions.SET_STREAM_URL_SUCCESS]: (state, action) => {
      return {
        ...state,
        stream: {
          url: action.payload,
        },
      }
    },

    // Set Stream URL as null
    [actions.SET_STREAM_URL_FAILED]: (state, action) => {
      return {
        ...state,
        stream: {
          url: '',
        },
      }
    },

    // Set Participants Joined
    [actions.PARTICIPANT_JOINED]: (state, action) => {
      console.log('ParticipantJoined Param =>', action.payload)
      const participants = [...state.participants, action.payload]
      const newP = action.payload
      const pin = state.pins.find((pin) => pin.identity === newP.identity)
      if (!pin && state.pins.length < 7) {
        return {
          ...state,
          participants: participants,
          pins: [...state.pins, { identity: newP.identity, locked: false }],
        }
      }
      return {
        ...state,
        participants: participants,
        // pins: [...state.pins, { identity: newP.identity, locked: false }],
      }
    },

    // Remove Participants Exit
    [actions.PARTICIPANT_EXIT]: (state, action) => {
      console.log('ParticipantExit Param =>', action.payload)
      const ext = action.payload
      const participants = [...state.participants]
      const filteredParticipants = participants.filter(
        (p) => p.identity !== ext.identity,
      )
      const filteredPins = state.pins.filter((p) => p.identity !== ext.identity)
      return {
        ...state,
        participants: filteredParticipants ? filteredParticipants : [],
        pins: filteredPins ? filteredPins : [],
      }
    },

    [actions.INIT_PARTICIPANTS]: (state, action) => {
      console.log('InitParticipants Param => ', action.payload)
      return {
        ...state,
        participants: [...action.payload.participants],
      }
    },

    // Set Room Data
    [actions.SET_TWILIO_ROOM]: (state, action) => {
      console.log('SET TWILIO ROOM => ', action.payload)
      return {
        ...state,
        room: action.payload,
      }
    },
  },
  initState,
)
export default roomReducer
