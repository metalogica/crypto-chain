import React from 'react';

const Transaction = ({ transaction }) => {
  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    (input &&) {
      <div>
        <div> From: {`${input.address.substring(0, 20)}...`} | Balance: {input.amount}</div>
        {
          // implicit return of JSX used
          recipients.map(recipient => (
            <div key={recipient}>
              To: {`${recipient.substring(0, 20)}...`} | Sent: {outputMap[recipient]}
            </div>
          ))
        }
      </div>
    }
  )
}

export default Transaction;
