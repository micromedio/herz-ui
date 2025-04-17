/** @jsxImportSource theme-ui */

import React, { HTMLAttributes, useCallback, useState } from 'react';
import Divider from '../Divider/Divider';
import { AccordionContext, useAccordionContext } from './context';
import { AnimatePresence, motion } from 'framer-motion';
import { get } from 'theme-ui';
import { IconChevronDown } from '@tabler/icons-react';

const insertDivider = (items: Array<React.ReactNode>) => {
  let result: Array<React.ReactNode> = [];

  items.forEach((current, index) => {
    if (index < items.length - 1) {
      result = result.concat(
        current,
        <Divider aria-hidden key={`divider-${index}`} />
      );
    } else {
      result.push(current);
    }
  });

  return result;
};

export interface AccordionProps {
  initialOpenIndex?: number;
  children: React.ReactNode;
  activeBackgroundColor?:
    | 'primary'
    | 'secondary'
    | 'text'
    | 'success'
    | 'warning';
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

const Accordion = ({
  children,
  initialOpenIndex,
  activeBackgroundColor = 'secondary',
  className,
}: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | undefined>(
    initialOpenIndex
  );

  const toggleOpen = useCallback(
    (index: number) => {
      if (openIndex === index) setOpenIndex(undefined);
      else setOpenIndex(index);
    },
    [openIndex]
  );

  const allItems = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child))
    .map((child, index) => (
      <AccordionContext.Provider
        value={{ index, toggleOpen, openIndex, activeBackgroundColor }}
        key={index}
      >
        {child}
      </AccordionContext.Provider>
    ));

  return <div className={className}>{insertDivider(allItems)}</div>;
};

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

const AccordionItem = ({ title, children, className }: AccordionItemProps) => {
  const { index, toggleOpen, openIndex, activeBackgroundColor } =
    useAccordionContext();
  const isOpen = openIndex === index;

  return (
    <div
      sx={{
        backgroundColor: (t) =>
          isOpen ? get(t, `colors.${activeBackgroundColor}.97`) : 'transparent',
        transition: 'background-color 150ms linear',
      }}
    >
      <div
        role="button"
        aria-disabled="false"
        aria-expanded={isOpen}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 6,
          py: 3,
          variant: 'text.body1',
          color: 'text.40',
          cursor: 'pointer',
        }}
        onClick={() => toggleOpen(index)}
      >
        <span>{title}</span>
        <IconChevronDown
          sx={{
            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto' },
              collapsed: { height: 0, overflow: 'hidden' },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              sx={{
                px: 6,
                pb: 4,
              }}
              className={className}
            >
              {children}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

Accordion.Item = AccordionItem;
export default Accordion;
