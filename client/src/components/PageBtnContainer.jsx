import { useLocation, useNavigate } from 'react-router-dom';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/styledWrappers/PageBtnContainer';

function PageBtnContainer({ currentPage, numOfPages }) {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const pagination = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePageNumber = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPaginationBtn = ({ pageNumber, activeClass }) => (
    <button
      key={pageNumber}
      className={`btn page-btn ${activeClass ? 'active' : ''}`}
      onClick={() => handlePageNumber(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const renderPaginationBtns = () => {
    const paginationBtns = [];

    paginationBtns.push(
      addPaginationBtn({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    if (currentPage > 3) {
      paginationBtns.push(<span className="page-btn dots" key="dots-1">...</span>);
    }

    if (currentPage !== 1 && currentPage !== 2) {
      paginationBtns.push(addPaginationBtn({ pageNumber: currentPage - 1 }));
    }

    if (currentPage !== 1 && currentPage !== numOfPages) {
      paginationBtns.push(addPaginationBtn({ pageNumber: currentPage, activeClass: true }));
    }

    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      paginationBtns.push(addPaginationBtn({ pageNumber: currentPage + 1 }));
    }

    if (currentPage < numOfPages - 2) {
      paginationBtns.push(<span className="page-btn dots" key="dots+1">...</span>);
    }

    paginationBtns.push(
      addPaginationBtn({ pageNumber: numOfPages, activeClass: currentPage === numOfPages })
    );

    return paginationBtns;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => handlePageNumber(currentPage > 1 ? currentPage - 1 : numOfPages)}
      >
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">{renderPaginationBtns()}</div>

      <button
        className="btn next-btn"
        onClick={() => handlePageNumber(currentPage < numOfPages ? currentPage + 1 : 1)}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer;



