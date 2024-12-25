"use client";
import React from "react";

interface IConditionRender {
  condition: boolean;
  children: React.ReactNode;
}

const ConditionRender: React.FC<IConditionRender> = ({ condition, children }) => {
  return <>{condition && children}</>;
};

export default ConditionRender;
