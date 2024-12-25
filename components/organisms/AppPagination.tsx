import React from "react";
import { Pagination } from "antd";

interface IPagination {
  current: number;
  total: number;
}

const AppPagination: React.FC = () => <Pagination defaultCurrent={1} total={50} />;

export default AppPagination;
