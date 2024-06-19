/** @jsxImportSource theme-ui */
import React, {
  KeyboardEvent,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useThemeUI } from 'theme-ui';
import { useTabContext } from './context';
import { TabContext } from './context';
import { useMeasure } from 'react-use';

export interface TabsProps {
  children: React.ReactNode;
  className?: string;
  initialOpenIndex?: number;
}

const Tabs = ({ children, className, initialOpenIndex }: TabsProps) => {
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

  const allItems = (
    React.Children.toArray(children).filter((child) => {
      return React.isValidElement(child);
    }) as Array<ReactElement>
  ).map((child, index, array) => {
    let tabId = '';
    let panelId = '';
    if (child.props.title !== undefined) {
      const { title } = child.props;
      tabId = `${title}-tab`;
      panelId = `${title}-content-panel`;
    } else {
      const { title } = array[child.props.index].props;
      tabId = `${title}-tab`;
      panelId = `${title}-content-panel`;
    }
    return (
      <TabContext.Provider
        value={{ index, openIndex, panelId, tabId, toggleOpen }}
        key={index}
      >
        {child}
      </TabContext.Provider>
    );
  });

  const tabButton = allItems.filter((item) =>
    item.props.children.props.hasOwnProperty('title')
  );
  const tabPanel = allItems.filter((item) =>
    item.props.children.props.hasOwnProperty('index')
  );
  return (
    <div className={className}>
      <header
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
      >
        {tabButton.map((item) => item)}
      </header>
      {tabPanel.map((item) => item)}
    </div>
  );
};

export interface TabButtonProps {
  title: string;
}

const OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH = 18.53;
const ORANGE_RECT_LINES_WIDTH_DIFF = 8.12;
const LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE = 6.5;
const TEXT_PADDING = 6;

const SVG_HEIGHT = 36;

const TabButton = ({ title }: TabButtonProps) => {
  const { index, openIndex, panelId, tabId, toggleOpen } = useTabContext();
  const isFirstTab = useMemo(() => index === 0, [index]);
  const isOpen = useMemo(() => openIndex === index, [index, openIndex]);
  const { theme } = useThemeUI();
  const [textRef, { width }] = useMeasure<HTMLSpanElement>();
  const tabRef = useRef<HTMLDivElement>(null);

  const containerWidth = useMemo(() => {
    if (isFirstTab)
      return (
        width +
        TEXT_PADDING * 2 +
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH +
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
      );
    return width + OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2 + TEXT_PADDING * 2;
  }, [isFirstTab, width]);

  const borderPath = useMemo(() => {
    if (isFirstTab) {
      return `m 0.5 36 l 0 -27 c 0 -4 2 -8 6.53 -8 l ${
        containerWidth -
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
      } 0 c 4.47 0 6.47 4 6.47 8 l 0 17 c 0 5 5 10 12 10`;
    }
    return `m 0 36 c 8 -1 12 -6 12 -12 l 0 -15 c 0 -4 2 -8 6.53 -8 l ${
      containerWidth - OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2
    } 0 c 4.47 0 6.47 4 6.47 8 l 0 17 c 0 5 5 10 12 10`;
  }, [containerWidth, isFirstTab]);

  const orangeRectPath = useMemo(() => {
    if (isFirstTab) {
      return `m 2.97 3.3 l ${
        containerWidth -
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE +
        ORANGE_RECT_LINES_WIDTH_DIFF
      } 0 c 0 -1 -2.59 -2 -4.06 -2 l -${
        containerWidth -
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
      } 0 c -1.53 0 -3.53 1 -4.06 2 z`;
    }
    return `m 14.47 3.3 l ${
      containerWidth -
      OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2 +
      ORANGE_RECT_LINES_WIDTH_DIFF
    } 0 c 0 -1 -2.59 -2 -4.06 -2 l -${
      containerWidth - OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2
    } 0 c -1.53 0 -3.53 1 -4.06 2 z`;
  }, [containerWidth, isFirstTab]);

  const keyboardTabToggler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.code === 'Space' && openIndex !== index) {
        toggleOpen(index);
        tabRef.current?.blur();
      }
    },
    [index, openIndex, toggleOpen]
  );

  const mouseTabToggler = useCallback(() => {
    if (openIndex !== index) {
      toggleOpen(index);
      tabRef.current?.blur();
    }
  }, [index, openIndex, toggleOpen]);

  const hoverOrFocusedStyles = useMemo(
    () =>
      isOpen
        ? { '& > svg > path:first-of-type': { fill: 'text.95' } }
        : {
            '& > span': {
              backgroundColor: 'text.95',
              borderRadius: 1,
              color: 'text',
              padding: 1,
            },
          },
    [isOpen]
  );

  return (
    <div
      aria-controls={panelId}
      aria-selected={openIndex === index}
      id={tabId}
      onClick={mouseTabToggler}
      onKeyPress={keyboardTabToggler}
      ref={tabRef}
      sx={{
        cursor: 'pointer',
        display: 'grid',
        height: SVG_HEIGHT,
        mb: '-1px',

        role: 'tab',

        '&:focus': {
          outline: 'none',
          ...hoverOrFocusedStyles,
        },

        '&:hover': {
          ...hoverOrFocusedStyles,
        },
      }}
      tabIndex={0}
    >
      <svg
        aria-disabled="false"
        aria-expanded={isOpen}
        height={SVG_HEIGHT}
        role="button"
        sx={{
          cursor: 'pointer',
          mb: '-0.8px',
          gridColumn: 1,
          gridRow: 1,
          zIndex: 1,
        }}
        width={containerWidth}
      >
        <path
          d={borderPath}
          fill={isOpen ? '#ffffff' : 'transparent'}
          stroke={isOpen ? theme.colors?.text?.[90] : 'transparent'}
          strokeWidth={1}
          sx={{
            transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionProperty: 'fill, stroke',
          }}
        />
        <path
          d={orangeRectPath}
          fill={isOpen ? theme.colors?.primary?.[0] : 'transparent'}
          sx={{
            transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionProperty: 'fill, stroke',
          }}
        />
      </svg>
      <span
        ref={textRef}
        sx={{
          alignSelf: 'center',
          color: isOpen ? 'text' : 'text.40',
          gridColumn: 1,
          gridRow: 1,
          justifySelf: 'center',
          mr:
            index === 0
              ? OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
                LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
              : undefined,
          variant: 'text.heading4',
          width: 'fit-content',
          zIndex: 2,
        }}
      >
        {title}
      </span>
    </div>
  );
};

export interface TabPanelProps {
  children: React.ReactNode;
  index: number;
}

const TabPanel = ({ children, index }: TabPanelProps) => {
  const { openIndex, panelId, tabId } = useTabContext();
  const isOpen = openIndex === index;
  return (
    <section aria-labelledby={tabId} id={panelId} role="tabpanel">
      {isOpen && (
        <div
          id={index.toString()}
          sx={{
            display: 'block',
            position: 'relative',
            py: 5,
            px: 6,
            borderRadius: 3,
            borderTopLeftRadius: openIndex == 0 && isOpen ? 0 : 3,
            border: '1px solid',
            borderColor: 'text.90',
            backgroundColor: 'text.95',
            boxShadow: isOpen ? 'main' : 'none',
          }}
        >
          {children}
        </div>
      )}
    </section>
  );
};

Tabs.Tab = TabButton;
Tabs.Panel = TabPanel;
export default Tabs;
