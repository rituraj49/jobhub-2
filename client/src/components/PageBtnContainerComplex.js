import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer"
import { useAppContext } from "../context/appContext"
import { TiChevronRightOutline, TiChevronLeftOutline } from 'react-icons/ti'

function PageBtnContainerComplex() {
    const { page, numOfPages, changePage, getAllJobs } = useAppContext();
    const navigate = useNavigate();
    // console.log(page, numOfPages);
    const pages = Array.from({ length: numOfPages },
        (anything, index) => index + 1);
    // console.log(pages);

    const handleChangePage = (currPage) => {
        console.log(currPage);
        changePage(currPage);
        navigate(`?page=${page}`)
        getAllJobs();
    }

    const addPageButton = ({ pageNum, activeClass }) => {
        return (
            <button className={`btn pageBtn ${activeClass && 'active'}`}
                key={pageNum}
                onClick={() => handleChangePage(pageNum)}
            >{pageNum}</button>
        )
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        // first page
        pageButtons.push(addPageButton({ pageNum: 1, activeClass: page === 1 }));
        
        // dots
        if(page > 3){
            pageButtons.push(
                <span className="btn pageBtn" key='dots-1'>...</span>
            )
        }

        //  one before current page
        if(page !== 1 && page !== 2){
            pageButtons.push(addPageButton({ pageNum: page - 1, activeClass: false}));
        }

        // current page
        if(page !== 1 && page !== numOfPages){
            pageButtons.push(addPageButton({ pageNum: page, activeClass: true}))
        }
        
        
        // one after current page 
        if(page !== numOfPages && page !== numOfPages - 1){
            pageButtons.push(addPageButton({ pageNum: page + 1, activeClass: false}));
        }
        
        // dots
        if(page < numOfPages - 2){
            pageButtons.push(
                <span className="btn pageBtn" key='dots+1'>...</span>
            )
        }

        // last page
        pageButtons.push(addPageButton({ pageNum: numOfPages, activeClass: page === numOfPages }));
        return pageButtons
    }


    return (
        <Wrapper>
            <button className="btn prev-btn"
                onClick={() => {
                    let prevPage = page - 1;
                    if (prevPage < 1) prevPage = numOfPages;
                    handleChangePage(prevPage);
                }}
            >
                <TiChevronLeftOutline />
                prev
            </button>
            <div className="btn-container">
                {renderPageButtons()}
                {/* {
                pages.map((pageNum) => {
                    return <button className={`btn pageBtn ${pageNum === page && 'active'}`}
                    key={pageNum}
                    onClick={() => handleChangePage(pageNum)}
                    >{pageNum}</button>
                })
            } */}
            </div>
            <button className="btn next-btn"
                onClick={() => {
                    let nextPage = page + 1;
                    if (nextPage > numOfPages) nextPage = 1;
                    handleChangePage(nextPage);
                }}
            >
                <TiChevronRightOutline />
                next
            </button>
        </Wrapper>
    )
}
export default PageBtnContainerComplex