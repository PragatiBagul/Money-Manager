import { DetailsOutlined, Error } from '@material-ui/icons';
import React,{useEffect,useRef} from 'react';
import { Divider, Grid } from '@material-ui/core';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';
import useStyles from './styles';
import Provider from './context/context';
import Details from './components/details/Details';
import Main from './components/main/Main';

const App = () => {
    const classes = useStyles();
    const { speechState } = useSpeechContext();

    const main = useRef(null);
    const executeScroll = () => main.current.scrollIntoView();

    useEffect(() => {
        if (speechState === SpeechState.Recording) {
            executeScroll();
        }
    }, [speechState]);
    return (
        <div>
        <Grid className={ classes.grid } container spacing={0} alignContent="center" justify="center" style={{height: '100vh'}}>
            <Grid item xs={12} sm={ 4 }>
                <Details title="Income"/>
            </Grid>
            <Grid ref={main} item xs={12} sm={3} className={classes.main} >
                <Main/>
            </Grid>
            <Grid item xs={12} sm={ 4 } className={classes.desktop}>
                <Details title="Income"/>
            </Grid>
                <Grid item xs={12} sm={4} className={ classes.last }>
                <Details title="Expense"/>
            </Grid>
        </Grid>
        <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel/>
        </PushToTalkButtonContainer>
        </div>
    )
}

export default App;
