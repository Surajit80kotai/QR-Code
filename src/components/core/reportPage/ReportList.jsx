import React from 'react'

const ReportList = ({ item }) => {

    return (
        <>
            <tr>
                <td>{item?.transaction_id}</td>
                <td>{item?.transaction_date}</td>
                <td><span className="badge badge-success">₹ {item?.transaction_amount}</span></td>
                <td>{item?.count}</td>
                <td>{item?.tag}</td>
            </tr>
        </>
    )
}

export default ReportList