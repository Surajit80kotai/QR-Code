import React from 'react'

const UserReportList = ({ item }) => {

    return (
        <>
            <tr>
                <td>{item?.data?.full_name?.length > 0 ? item?.data?.full_name : "N/A"}</td>
                <td>{item?.data?.mobile_number?.length > 0 ? item?.data?.mobile_number : "N/A"}</td>
                <td>{item?.data?.Recent_Purchases?.length > 0 ? item?.data?.Recent_Purchases : "N/A"}</td>
                <td>{item?.data?.Quality_Rating?.length > 0 ? item?.data?.Quality_Rating : "N/A"}</td>
                <td>{item?.data?.Purchase_Location?.length > 0 ? item?.data?.Purchase_Location : "N/A"}</td>
                <td>{item?.data?.Purchase_Price?.length > 0 ? item?.data?.Purchase_Price : "N/A"}</td>
                <td>{item?.data?.Future_Purchases?.length > 0 ? item?.data?.Future_Purchases : "N/A"}</td>
                <td>{item?.data?.Additional_Comments?.length > 0 ? item?.data?.Additional_Comments : "N/A"}</td>
            </tr>
        </>
    )
}

export default UserReportList