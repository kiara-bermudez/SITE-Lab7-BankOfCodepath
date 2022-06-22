import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {

  const handleOnFormFieldChange = (event) => {
    
    let eventVal = event.target.value;
    let eventName = event.target.name;

    if (eventName === "description") {
      props.form.description = eventVal;
    } else if (eventName === "category") {
      props.form.category = eventVal;
    } else {
      props.form.amount = eventVal;
    }

    props.setForm({...props.form});
    console.log("form2", props.form);
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm  isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.form} setForm={props.setForm} handleOnSubmit={props.handleOnSubmit} handleOnFormFieldChange={handleOnFormFieldChange} />
    </div>
  )
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" type="string" placeholder="Enter a description..." value={props.form?.description || ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" type="string" placeholder="Enter a category..." value={props.form?.category || ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount" type="number" placeholder="Enter an amount..." value={props.form?.amount || ""} onChange={props.handleOnFormFieldChange}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
