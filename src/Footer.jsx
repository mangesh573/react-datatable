import React from 'react'



function Footer(props) {
    const userPages = props.totalUsers >= props.usersPerPage ? [...Array(Math.ceil(props.totalUsers / props.usersPerPage))].map((_, i) => i) : [...Array(1)].map((_, i) => i);
    const nextPage = () => {
        if (props.currentPage + 1 < props.totalUsers / props.usersPerPage)
            props.setCurrentPage(props.currentPage + 1)
    }
    const prevPage = () => {
        if (props.currentPage > 0)
            props.setCurrentPage(props.currentPage - 1)
    }
    return (
        <>
            <div className='d-flex justify-content-end'>

                <nav aria-label="Page navigation example"  >
                    <ul className="pagination ">
                        <li className="page-item ">
                            <a className="page-link" href="#" onClick={prevPage} style={{ color: "#337AB7" }}>Previous</a>

                        </li>
                        {
                            userPages.map(pgNumber => (
                                <li key={pgNumber} className={`page-item  ${props.currentPage == pgNumber ? 'active' : ''} `}>
                                    <a onClick={() => props.setCurrentPage(pgNumber)} className="page-link " href="#">
                                        {pgNumber + 1}
                                    </a>
                                </li>
                            ))
                        }


                        <li className="page-item">
                            <a className="page-link" href="#" onClick={nextPage} style={{ color: "#337AB7" }}>Next</a>

                        </li>
                    </ul>
                </nav>

            </div>

        </>
    )
}

export default Footer;