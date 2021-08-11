import React, { useState, useEffect,useContext } from 'react';
import useStyles from './styles';
import { MoneyManagerContext } from '../../../context/context';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import CustomisedSnackbar from '../../snackbar/Snackbar';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
};

const Form = () => {
    const classes = useStyles();
    const [formData, setformData] = useState(initialState);
    const { addTransaction } = useContext(MoneyManagerContext);
    const [open, setOpen] = useState(false);
    const { segment } = useSpeechContext();

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        if (!formData.amount && !formData.category && !formData.date && !formData.type) {
            console.log("Required field is empty");
            return;
        }
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }
        setOpen(true);
        addTransaction(transaction);
        setformData(initialState);
    }

    useEffect(() => {
        if (segment)
        {
            if (segment.intent.intent === 'add_expense') {
                setformData({...formData, type: 'Expense'})
            } else if(segment.intent.intent === 'add_income') {
                setformData({...formData, type: 'Income'})
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction')
            {
                return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction')
            {
                return setformData(initialState);
            }

            segment.entities.forEach((s) => {
                const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
        
                switch (s.type) {
                  case 'amount':
                    setformData({ ...formData, amount: s.value });
                    break;
                  case 'category':
                    if (incomeCategories.map((iC) => iC.type).includes(category)) {
                      setformData({ ...formData, type: 'Income', category });
                    } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                      setformData({ ...formData, type: 'Expense', category });
                    }
                    break;
                  case 'date':
                    setformData({ ...formData, date: s.value });
                    break;
                  default:
                    break;
                }
              });
        
              if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction();
              }
        }
    }, [segment]);


    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;
    
    return (
        <Grid container spacing={2}>
            <CustomisedSnackbar open={open} setOpen={ setOpen }/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                {segment ? (
        <div className="segment">
          {segment.words.map((w) => w.value).join(" ")}
        </div>
      ) : null}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setformData({ ...formData, type: e.target.value })} required={true}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select  value={ formData.category } onChange={(e) => setformData({...formData,category:e.target.value})} required={true}>
                    {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{ c.type }</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth  value={ formData.amount } onChange={(e) => setformData({...formData,amount:e.target.value})} required={true}/>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setformData({ ...formData, date: formatDate(e.target.value) })} required={true}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form;
