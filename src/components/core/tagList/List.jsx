import React from 'react';
import { Link } from 'react-router-dom';


const List = ({ item, index }) => {

    const originalDateString = item?.updatedAt;
    const originalDate = new Date(originalDateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);

    return (
        <>
            <tr >
                <th scope="row">
                    <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} >{index + 1}</Link>
                </th>
                <td>
                    <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} >{item?.name}</Link>
                </td>
                <td>
                    <span className="badge badge-success">
                        <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} className="text-white">{item?.count}</Link>
                    </span>
                </td>
                <td>
                    <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} >{formattedDate}</Link>
                </td>
            </tr>
        </>
    )
}

export default List