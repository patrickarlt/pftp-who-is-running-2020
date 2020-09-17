import React from "react";
import styles from "./AccordionItem.module.css";
import * as ReactAccordion from "react-accessible-accordion";
import { classNames } from "react-extras";

interface IAccordionItemProps {
  title: string;
  uuid: string;
}

const AccordionItem: React.FunctionComponent<IAccordionItemProps> = function AccordionItem({
  children,
  title,
  uuid,
}) {
  return (
    <ReactAccordion.AccordionItem className={styles.accordionItem} uuid={uuid}>
      <ReactAccordion.AccordionItemState>
        {({ expanded }: { expanded: boolean }): JSX.Element => (
          <>
            <ReactAccordion.AccordionItemHeading
              className={styles.accordionHeader}
            >
              <ReactAccordion.AccordionItemButton
                className={classNames(styles.accordionButton, {
                  [styles.expanded]: expanded,
                })}
              >
                {title}
              </ReactAccordion.AccordionItemButton>
            </ReactAccordion.AccordionItemHeading>
            <ReactAccordion.AccordionItemPanel
              className={styles.accordionPanel}
            >
              {children}
            </ReactAccordion.AccordionItemPanel>
          </>
        )}
      </ReactAccordion.AccordionItemState>{" "}
    </ReactAccordion.AccordionItem>
  );
};

export default AccordionItem;
