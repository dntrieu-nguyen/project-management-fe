import React from "react";
import { Table, Button } from "antd";
import { ITableProps } from "@/types/components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const AppTable = <T,>(props: ITableProps<T>) => {
  const { data, columns, pagination } = props;

  const handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    props.onPageChange(pagination, filters, sorter, extra);
  };

  return (
    <div className="my-3">
      <Table
        scroll={{ x: 1500, y: 400 }}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        loading={props.loading}
        pagination={{
          current: pagination?.current,
          pageSize: pagination?.pageSize,
          total: pagination?.total,
          itemRender: (current, type, originalElement) => {
            if (type === "prev") {
              return (
                <Button onClick={() => {}}>
                  <LeftOutlined />
                </Button>
              );
            }
            if (type === "next") {
              return (
                <Button onClick={() => {}}>
                  <RightOutlined />
                </Button>
              );
            }
            return originalElement;
          },
        }}
      />
    </div>
  );
};

export default AppTable;
