import React from "react";
import styles from "./Template.module.css";

interface ITemplateProps {}

const Template: React.FunctionComponent<ITemplateProps> = function Template({
  children,
}) {
  return <div>Test</div>;
};

export default Template;
