"use client";

import React, { useState } from "react";
import { Pagination } from "antd";

interface DataPaginationProps{
    onChangePagination: (page:number, pageSize: number) => void;
}

const DataPagination: React.FC<DataPaginationProps> = ({onChangePagination}) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10);
    const handleChange = (page: number, pageSize:number) => {
        setPage(page)
        setPageSize(pageSize)
        onChangePagination(page, pageSize)
        // console.log({page, pageSize})
    }
  return (
    <div>
      <Pagination defaultCurrent={1} onChange={handleChange} total={500} />
    </div>
  );
};

export default DataPagination;
