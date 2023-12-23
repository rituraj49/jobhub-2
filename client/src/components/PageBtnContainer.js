import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer"
import { useAppContext } from "../context/appContext"
import {TiChevronRightOutline, TiChevronLeftOutline} from 'react-icons/ti'

function PageBtnContainer() {
    const { page, numOfPages, changePage, getAllJobs } = useAppContext();
    const navigate = useNavigate();
    // console.log(page, numOfPages);
    const pages = Array.from({length:numOfPages},
        (anything, index) => index + 1);
    // console.log(pages);
    
    const handleChangePage = (currPage) => {
        console.log(currPage);
        changePage(currPage);
        navigate(`?page=${page}`)
        getAllJobs();
    }

  return (
    <Wrapper>
        <button className="btn prev-btn"
        onClick={() => {
            let prevPage = page - 1;
            if(prevPage < 1) prevPage = numOfPages;
            handleChangePage(prevPage);
        }}
        >
        <TiChevronLeftOutline />
        prev
        </button>
        <div className="btn-container">
            {
                pages.map((pageNum) => {
                    return <button className={`btn pageBtn ${pageNum === page && 'active'}`}
                    key={pageNum}
                    onClick={() => handleChangePage(pageNum)}
                    >{pageNum}</button>
                })
            }
        </div>
        <button className="btn next-btn"
        onClick={() => {
            let nextPage = page + 1;
            if(nextPage > numOfPages) nextPage = 1;
            handleChangePage(nextPage);
        }}
        >
        <TiChevronRightOutline />
        next
        </button>
    </Wrapper>
  )
}
export default PageBtnContainer