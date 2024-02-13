import React from 'react';
import { Link } from 'react-router-dom';


const List = ({ item, index }) => {

    const originalDateString = item?.updatedAt;
    const originalDate = new Date(originalDateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);

    return (
        <>
            <tr>
                <th>
                    <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} >{index + 1}</Link>
                </th>
                <th>
                    <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} >{item?.name}</Link>
                </th>
                <th>
                    <span className="badge badge-success">
                        <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} className="text-white">{item?.count}</Link>
                    </span>
                </th>
                <th>
                    <span className="badge badge-warning">
                        <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} className="text-white">{item?.cashback_lucky_users}</Link>
                    </span>
                </th>
                <th>
                    <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/${item?.name}`} >{formattedDate}</Link>
                </th>

            </tr>
        </>
    )
}

export default List