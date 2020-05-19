import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Room from '../../components/Party/Room'
import useRoomState from '../../hooks/useRoomState'
import useVideoPartyContext from '../../hooks/useVideoPartyContext'
import Controls from '../../components/Party/Controls'
import { styled } from '@material-ui/core/styles'
import { makeStyles, Typography, Button } from '@material-ui/core'
import PinParticipant from '../../components/Party/Participant/PinParticipant'
import Participant from '../../components/Party/Participant'
import ConfigureDialog from '../../components/Dialogs/ConfigureDialog'
// import { LocalParticipant } from 'twilio-video'
import LocalParticipant from '../../components/Party/Participant/LocalParticipant'
import MainParticipant from '../../components/Party/Participant/MainParticipant'
import ReactPlayer from 'react-player'
import LiveStream from '../../components/Party/LiveStream'

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `1fr 1fr 1fr 1fr 1fr 1fr`,
  gridTemplateRows: `1fr 1fr 1fr 1fr 1fr`,
  gap: '5px 5px',
  gridTemplateAreas: `"lg mp mp mp mp ct"
                      "mg mp mp mp mp ct"
                      "mg mp mp mp mp bt"
                      "me mp mp mp mp t7"
                      "t1 t2 t3 t4 t5 t6"`,
}))

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    backgroundColor: '#3f3f3f',
    color: theme.palette.primary.contrastText,
    height: '100%',
    position: 'relative',
  },
  mainViewer: {
    gridArea: 'mp',
    padding: theme.spacing(1),
    backgroundColor: '#343334',
  },
  logo: {
    gridArea: 'lg',
    textAlign: 'center',
    paddingTop: '10px',
  },
  chat: {
    gridArea: 'mg',
    backgroundColor: 'white',
    border: '1px solid red',
    color: 'black',
  },
  me: {
    gridArea: 'me',
  },
  tabControl: {
    gridArea: 'ct',
  },
  t1: {
    gridArea: 't1',
  },
  t2: {
    gridArea: 't2',
  },
  t3: {
    gridArea: 't3',
  },
  t4: {
    gridArea: 't4',
  },
  t5: {
    gridArea: 't5',
  },
  t6: {
    gridArea: 't6',
  },
  t7: {
    gridArea: 't7',
  },
  t8: {
    gridArea: 't8',
  },
  tabControlWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tabControlItem: {
    padding: theme.spacing(1),
    opacity: '0.3',
  },
  tabControlItemActive: {
    padding: theme.spacing(1),
    opacity: 1,
  },

  randomButton: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    color: 'cyan',
    border: '2px solid cyan',
    borderRadius: '0px',
    // marginLeft: 'auto',
    float: 'right',
  },

  configureButton: {
    color: '#19ff03',
    border: '2px solid #19ff03',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '5px',
    alignItems: 'flex-end',
  },
}))

const PartyTabControl = ({ status, setTabStatus }) => {
  const classes = useStyles()
  return (
    <div className={classes.tabControlWrapper}>
      <div
        className={`${
          status === 'dj'
            ? classes.tabControlItemActive
            : classes.tabControlItem
        }`}
        onClick={() => setTabStatus('dj')}
      >
        <img src="./assets/live-dj-white.png" alt="DJ" />
      </div>
      <div
        className={`${
          status === 'fav'
            ? classes.tabControlItemActive
            : classes.tabControlItem
        }`}
        onClick={() => setTabStatus('fav')}
      >
        <img src="./assets/fav.png" alt="fav" />
      </div>
      <div
        className={`${
          status === 'grid'
            ? classes.tabControlItemActive
            : classes.tabControlItem
        }`}
        onClick={() => setTabStatus('grid')}
      >
        <img src="./assets/grid.png" alt="Grid" />
      </div>
    </div>
  )
}
const VideoParty = () => {
  const classes = useStyles()
  // const roomData = useSelector((state) => state.room)
  const roomState = useRoomState()
  const [tabStatus, setTabStatus] = useState('dj')
  const userData = useSelector((state) => state.user)
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const onConfigureLiveStream = () => {
    console.log('true')
    setShowConfigDialog(true)
  }
  const setStreamUrl = (url) => {
    console.log(url)
  }

  const onRandomButton = () => {
    console.log('asdf')
  }

  return (
    <>
      {showConfigDialog ? (
        <ConfigureDialog
          showDialog={showConfigDialog}
          closeDialog={() => setShowConfigDialog(false)}
          setStreamUrl={setStreamUrl}
        />
      ) : null}
      <main className={classes.mainWrapper}>
        {roomState === 'connected' ? (
          <>
            <Container>
              <div className={classes.mainViewer}>
                {tabStatus === 'dj' ? (
                  // dj view mode
                  <>
                    <LiveStream />
                    <div className={classes.buttonGroup}>
                      <Button
                        variant="outlined"
                        className={classes.randomButton}
                        onClick={onRandomButton}
                      >
                        Random Rooms
                      </Button>
                      {userData.role === 'dj' ? (
                        <Button
                          variant="outlined"
                          className={`${classes.randomButton}  ${classes.configureButton}`}
                          style={{ marginLeft: '5px' }}
                          onClick={onConfigureLiveStream}
                        >
                          Configure Live Stream
                        </Button>
                      ) : null}
                    </div>
                  </>
                ) : tabStatus === 'fav' ? (
                  // fav view mode
                  <>
                    <MainParticipant />
                    <div className={classes.buttonGroup}>
                      <Button
                        variant="outlined"
                        className={classes.randomButton}
                        onClick={onRandomButton}
                      >
                        Random Rooms
                      </Button>
                      {userData.role === 'dj' ? (
                        <Button
                          variant="outlined"
                          className={`${classes.randomButton}  ${classes.configureButton}`}
                          style={{ marginLeft: '5px' }}
                          onClick={onConfigureLiveStream}
                        >
                          Configure Live Stream
                        </Button>
                      ) : null}
                    </div>
                  </>
                ) : (
                  // grid view mode
                  <div> This is grid view screen </div>
                )}
              </div>
              <div className={classes.logo}>
                <img src="./assets/white-logo.png" />
                <Typography variant="body2" color="white">
                  squareparty
                </Typography>
              </div>
              <div className={classes.chat}>
                <p> Hello, how are you doing </p>
                <p> I am good </p>
              </div>
              <div className={classes.tabControl}>
                <PartyTabControl
                  status={tabStatus}
                  setTabStatus={setTabStatus}
                />
              </div>
              <div className={classes.me}>
                <LocalParticipant />
              </div>
              <div className={classes.t1}>
                <PinParticipant pinId={0} />
              </div>
              <div className={classes.t2}>
                <PinParticipant pinId={1} />
              </div>
              <div className={classes.t3}>
                <PinParticipant pinId={2} />
              </div>
              <div className={classes.t4}>
                <PinParticipant pinId={3} />
              </div>
              <div className={classes.t5}>
                <PinParticipant pinId={4} />
              </div>
              <div className={classes.t6}>
                <PinParticipant pinId={5} />
              </div>
              <div className={classes.t7}>
                <PinParticipant pinId={6} />
              </div>
            </Container>
            <Controls />
          </>
        ) : (
          <div> Not Connected !</div>
        )}
      </main>
    </>
  )
}

export default VideoParty
