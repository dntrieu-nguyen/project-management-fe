"use client";
import { Col, Row, Skeleton } from "antd";
import React from "react";

const DetailProjectLoading = () => {
  return (
    <div className="grid grid-cols-1">
      <Skeleton.Input className="" style={{ width: "100%", marginBottom: "0.5rem" }} active />
      <Skeleton.Input className="" style={{ width: "100%", marginBottom: "0.5rem" }} active />
      <Skeleton.Input className="" style={{ width: "100%", marginBottom: "0.5rem" }} active />
      <Skeleton.Input className="" style={{ width: "100%", marginBottom: "0.5rem" }} active />
    </div>
  );
};

export default DetailProjectLoading;
