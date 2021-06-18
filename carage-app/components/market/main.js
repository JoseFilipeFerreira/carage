import styled from "styled-components";
import { useRouter } from 'next/router'
import ReactPaginate from "react-paginate";

import { Top } from "../dashboard/main/top";
import { Ads } from "./main/ads";
import { Filters } from "./main/filters";

export const Main = ({ ads, page, brands, query, models }) => {
  const router = useRouter()
  let totalPages = Math.ceil(ads[0] / 10);
  let currentPage = page;

  function changePage(page) {
    if (window.location.href.includes('page')) {
      router.push(window.location.href.replace(/page=(\d+)/g,`page=${page.selected}`))
    } else {
      router.push(window.location.href + `?page=${page.selected}`)
    }
  }

  return (
    <Dash>
      <Top title="Market" />
      <Filters brands={brands} query={query} models={models} page={page}/>
      <div className="divisor"></div>
      <Ads ads={ads} />
      <ReactPaginate
        pageCount={totalPages}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"active"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        pageClassName={"page"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={(x) => changePage(x)}
        onPageActive={(x) => changePage(x)}
      />
    </Dash>
  );
};

const Dash = styled.div`
  background-color: var(--LEI1);
  height: 100%;
  width: 100%;
  border-radius: 50px 0 0 50px;
  padding: 30px;
  padding-right: 144px;
  padding-left: 144px;
  display: grid;
  grid-template-rows: 130px 55px min-content auto min-content;

  .divisor {
    width: 100%;
    height: 2px;
    background-color: var(--LEI2);
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .pagination {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 17px;
  }

  .page a, .previous a, .next a {
    padding-left: 7px;
    padding-right: 7px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 3px;
    cursor: pointer;
  }

  .page a:hover, .previous a:hover, .next a:hover {
    background-color: var(--LEI2-1);
  }

  .active a {
    background-color: var(--LEI2);
  }



  /* Portrait and Landscape */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  }
`;
