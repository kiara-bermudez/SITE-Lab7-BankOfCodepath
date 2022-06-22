import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import axios from "axios"
import {API_BASE_URL} from "../../constants"
import "./Home.css"

export default function Home(props) {


  React.useEffect(() => {
    const fetchTransactionsAndTransfers = async () => {
      props.setIsLoading(true);

      // Get and set transactions
      axios.get(`${API_BASE_URL}/bank/transactions`)
      .then(function (response) {
        const transactionData = response.data.transactions;
        props.setTransactions(transactionData);
      })
      .catch(function (error) {
        props.setError(error);
      })
      
      // Get and set transfers
      axios.get(`${API_BASE_URL}/bank/transfers`)      
      .then(function (response) {
        const transferData = response.data.transfers;
        props.setTransfers(transferData);
      })
      .catch(function (error) {
        props.setError(error);
      })

      props.setIsLoading(false);
    }

    fetchTransactionsAndTransfers();
  }, []);

  const renderHomeDisplay = () => {
    let addTransaction = <AddTransaction isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.newTransactionForm} setForm={props.setNewTransactionForm} handleOnSubmit={handleOnCreateTransaction}/>;

    if (props.isLoading) {
      return (
        <>
        {addTransaction}
        <h1>Loading...</h1>
        </>
        );
    }

    if (props.error) {
      return <h2 className="error">{String(props.error)}</h2>;
    }

    return (
      <>
      {addTransaction}
      <BankActivity transactions={filteredTransactions}/>
      </>
    )
      
    ;
  }

  let filteredTransactions;

  const filterTransactions = (transactionsArr) => {
    if (props.filterInputValue) {
      let filterText = props.filterInputValue.toLowerCase();
      filteredTransactions = transactionsArr.filter(transaction => {
        let description = transaction.description.toLowerCase();
        return description.includes(filterText);
      });
    } else {
      filteredTransactions = props.transactions;
    }

  }

  const handleOnSubmitNewTransaction = () => {

  }

  const handleOnCreateTransaction = async () => {

    props.setIsCreating(true);
    axios.post(`${API_BASE_URL}/bank/transactions`, {transaction:props.newTransactionForm})
    .then(function (response) {

      console.log("response", response);

      const transactionData = response.data.transaction;

      props.setTransactions(oldTransactions => [...oldTransactions, {...transactionData, id:oldTransactions.length}]);

      console.log("new trans array", props.transactions);
    })
    .catch(function (error) {
      props.setError(error);
      
    })

    props.setIsCreating(false);
  }

  return (
    <div className="home">
        
      {filterTransactions(props.transactions)}
      {renderHomeDisplay()}

    </div>
  )
}
