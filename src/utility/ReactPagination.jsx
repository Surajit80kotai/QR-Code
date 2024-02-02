import React from 'react';
import ReactPaginate from 'react-paginate';

const ReactPagination = ({ pageCount, changePage }) => {

    return (
        <ul className="pagination pagination-rounded justify-content-end mt-3 mb-0">
            <ReactPaginate
                breakLabel=''
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                renderOnZeroPageCount={null}
            />
        </ul>
    );
};

export default ReactPagination