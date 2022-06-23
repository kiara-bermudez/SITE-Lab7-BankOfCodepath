import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import "./TransactionDetail.css"
import axios from "axios";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = React.useState(false);
  const [transaction, setTransaction] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  let {transactionId} = useParams();

  React.useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true);
      setHasFetched(false);

      axios.get(`${API_BASE_URL}/bank/transactions/${transactionId}`)
      .then(function (response) {
        console.log("response", response);
        const transactionData = response.data.transaction;
        setTransaction(transactionData);
      })
      .catch(function (error) {
        setError(error);
      })

      setIsLoading(false);
      setHasFetched(true);
    }

    fetchTransactionById();
  }, [transactionId]);

  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId}/>
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null }) {

  if(Object.keys(transaction).length != 0) {
    return (
      <div className="transaction-card card">
        <div className="card-header">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction.category}</p>
        </div>

        <div className="card-content">
          <p className="description">{transaction.description}</p>
        </div>

        <div className="card-footer">
          <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
          <p className="date">{formatDate(transaction.postedAt)}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="transaction-card card">
        <div className="card-header">
          <h3>Transaction #{transactionId}</h3>
        </div>
        <h1>Not found</h1>
      </div>
      
    )
  }
  
}
