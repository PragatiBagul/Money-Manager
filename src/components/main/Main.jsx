import React ,{useContext} from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { MoneyManagerContext } from '../../context/context';
import Form from './form/Form';
import List from './list/List';
import useStyles from './styles';
const Main = () => {
    const classes = useStyles();
    const { balance } = useContext(MoneyManagerContext);
    return (
        <Card style={{marginTop:'0%'}} className={classes.root}>
            <CardHeader title="Money Manager" subheader="Manage your money"/>
            <CardContent>
                <Typography align="center" variant="h5">Total Balance { balance }</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    { /*Info Card*/}
                    Try saying : Add income for $100 in Category Salary for Monday
                    <Divider />
                        <Form/>
                </Typography>
            </CardContent>
            <CardContent className={classes.addContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
