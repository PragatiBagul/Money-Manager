import { useContext } from 'react';
import { MoneyManagerContext } from './context/context';
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';
 
const useTransactions = (title) => {
    //Resetting the previous data
    resetCategories();

    //Fetching all the transactions
    const { transactions } = useContext(MoneyManagerContext);

    //Filtering the transactions based on transaction type : Salary or Business
    const selectedTransactions = transactions.filter((t) => t.type === title);

    //Calculating the total amount as `total` from all the filtered transactions
    const total = selectedTransactions.reduce((accumulator, currValue) => accumulator += currValue.amount, 0);
    
    //Fetching the respective categories based on the transaction type
    const categories = title === 'Income' ? incomeCategories : expenseCategories;
    
    //Calculating the total amount for each category of the transaction type
    selectedTransactions.forEach(t => {
        const category = categories.find((c) => c.type === t.category);
        if (category)
            category.amount += t.amount;
    });

    //Removing categories whose amount is 0. 
    //i.e.- keeping the categories only which have at least one transaction performed
    const filteredCategories = categories.filter((c) => c.amount > 0);

    //Creating the data for the Doughnut
    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color)
        }],
        labels: filteredCategories.map((c) => c.type),
    }

    return { filteredCategories, total, chartData };
}

export default useTransactions;