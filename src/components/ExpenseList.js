import React from 'react';
import ExpSav from './ExpSav';

const ExpenseList = ({amountList, setAmountList}) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {
                    amountList.map(amount => (
                        <ExpSav
                            key={amount.id}
                            title={amount.title}
                            amountList={amountList}
                            setAmountList={setAmountList}
                            amount = {amount}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default ExpenseList;