import React, { useState } from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render } from '../../tests/utils';
import MobileModal from './MobileModal';

const mockedClientRects = {
  bottom: 619.5,
  height: 265,
  left: 455.578_125,
  right: 783.578_125,
  top: 354.5,
  width: 328,
  x: 455.578_125,
  y: 354.5,
};

const DismissibleWrapper = ({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <MobileModal
      onDismiss={() => {
        setOpen(false);
      }}
      open={open}
    />
  );
};

describe('MobileModal', () => {
  const consoleOutput: string[] = [];
  const originalWarn = console.warn;
  const mockedWarn = (output: string) => {
    consoleOutput.push(output);
  };

  afterEach(() => (console.warn = originalWarn));

  beforeEach(() => {
    console.warn = mockedWarn;
    Object.defineProperty(HTMLElement.prototype, 'getClientRects', {
      configurable: true,
      value: () => [mockedClientRects],
    });
  });

  test('It should render without errors', async () => {
    // Arrange
    const { getByTestId } = render(<MobileModal />);

    // Assert
    expect(getByTestId('test-background')).toBeInTheDocument();
    expect(getByTestId('test-modal')).toBeInTheDocument();
  });

  test('It should pass a11y check', async () => {
    // Arrange
    const { container } = render(<MobileModal />);

    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });

  test('It should be partially shown on page bottom', async () => {
    const overflowHeight = 64;
    // Arrange
    const { getByTestId } = render(
      <MobileModal overflowHeight={overflowHeight} />
    );

    const element = getByTestId(`test-modal`);
    const elementTopPosition = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPosition).toEqual(window.innerHeight - overflowHeight);
  });

  test('It should be open and with top spacing', async () => {
    // Arrange
    const { getByTestId } = render(<MobileModal open />);

    const element = getByTestId(`test-modal`);
    const elementTopPosition = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPosition).toEqual(
      window.innerHeight - element.getClientRects()[0].height
    );
  });

  test('It should raise a dev warning when added two modals with overflowHeight and draggable', async () => {
    const overflowHeight = 64;
    // Arrange
    render(
      <React.Fragment>
        <MobileModal draggable={true} overflowHeight={overflowHeight} />
        <MobileModal draggable={true} overflowHeight={overflowHeight} />
      </React.Fragment>
    );

    // Assert
    expect(consoleOutput).toContainEqual(
      `You are using another mobile modal with overflowHeight different from 0. You must control which one is rendered to avoid covering one with the another.`
    );
  });

  test('It should test the controlled open state', async () => {
    const topLimit = window.innerHeight - mockedClientRects.height;
    // Arrange
    const { getByTestId, rerender } = render(<MobileModal open={false} />);

    const element = getByTestId(`test-modal`);

    // Opening the modal
    rerender(<MobileModal open />);

    const elementTopPositionAfterOpen = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterOpen).toEqual(topLimit);

    // Closing the modal
    rerender(<MobileModal open={false} />);

    const elementTopPositionAfterClose = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterClose).toEqual(window.innerHeight);
  });

  test('It should test the controlled open state with dismissing on background touch', async () => {
    const topLimit = window.innerHeight - mockedClientRects.height;
    // Arrange
    const { getByTestId } = render(<DismissibleWrapper defaultOpen />);

    const background = getByTestId(`test-background`);

    const element = getByTestId(`test-modal`);

    const elementTopPositionStartedOpen = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionStartedOpen).toEqual(topLimit);

    fireEvent.touchEnd(background);

    const elementTopPositionAfterDismiss = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterDismiss).toEqual(window.innerHeight);
  });

  test('It should prevent transition end logic when the event was fired on any children', async () => {
    const onClose = jest.fn();
    // Arrange
    const { getByTestId } = render(<MobileModal overflowHeight={20} />);

    const element = getByTestId(`test-modal`);

    fireEvent.transitionEnd(element);

    // Assert
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});

describe('MobileModalDraggable', () => {
  const consoleOutput: string[] = [];
  const originalWarn = console.warn;
  const mockedWarn = (output: string) => {
    consoleOutput.push(output);
  };

  afterAll(() => {
    console.warn = originalWarn;
  });

  beforeAll(() => {
    console.warn = mockedWarn;
    Object.defineProperty(HTMLElement.prototype, 'getClientRects', {
      configurable: true,
      value: () => [mockedClientRects],
    });
  });

  test('It should open and close', async () => {
    const topLimit = window.innerHeight - mockedClientRects.height;
    // Arrange
    const { getByTestId } = render(<MobileModal draggable />);

    const element = getByTestId(`test-modal`);

    fireEvent.touchStart(element, {
      touches: [{ clientY: window.innerHeight - 15 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: window.innerHeight - 300 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPositionAfterOpen = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterOpen).toEqual(topLimit);

    fireEvent.touchStart(element, {
      touches: [{ clientY: 15 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: 300 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPositionAfterDismiss = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterDismiss).toEqual(window.innerHeight);
  });

  test("It should stay closed when the swipes doesn't reach the height threshold", async () => {
    const viewportHeight = window.innerHeight;
    // Arrange
    const { getByTestId } = render(<MobileModal draggable />);

    const element = getByTestId(`test-modal`);

    const elementTopPositionBeforeTryToOpen = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionBeforeTryToOpen).toEqual(viewportHeight);

    fireEvent.touchStart(element, {
      touches: [{ clientY: viewportHeight - 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: viewportHeight - 21 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPositionAfterTryToOpen = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterTryToOpen).toEqual(viewportHeight);
  });

  test("It should stay open when the swipes doesn't reach the height threshold", async () => {
    const viewportHeight = window.innerHeight;
    const topLimit = viewportHeight - mockedClientRects.height;
    // Arrange
    const { getByTestId } = render(<MobileModal draggable />);

    const element = getByTestId(`test-modal`);

    fireEvent.touchStart(element, {
      touches: [{ clientY: viewportHeight - 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: viewportHeight - 35 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPositionBeforeTryToClose = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionBeforeTryToClose).toEqual(topLimit);

    fireEvent.touchStart(element, {
      touches: [{ clientY: 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: 21 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPositionAfterTryToClose = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterTryToClose).toEqual(topLimit);
  });

  test('It should dismiss the mobile modal when touching the background', async () => {
    const tabSpacing = 256;
    const topLimit = window.innerHeight - mockedClientRects.height;
    // Arrange
    const { getByTestId } = render(
      <MobileModal dismissible draggable topSpacing={tabSpacing} />
    );

    const element = getByTestId(`test-modal`);

    const background = getByTestId(`test-background`);

    fireEvent.touchStart(element, {
      touches: [{ clientY: window.innerHeight - 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: window.innerHeight - 300 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPositionBeforeClose = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionBeforeClose).toEqual(topLimit);

    fireEvent.touchEnd(background);

    const elementTopPositionAfterClose = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPositionAfterClose).toEqual(window.innerHeight);
  });

  test('It should trigger onClose function', async () => {
    const onClose = jest.fn();
    // Arrange
    const { getByTestId } = render(<MobileModal draggable onClose={onClose} />);

    const background = getByTestId(`test-background`);
    const element = getByTestId(`test-modal`);

    fireEvent.touchStart(element, {
      touches: [{ clientY: window.innerHeight - 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: window.innerHeight - 300 }],
    });
    fireEvent.touchEnd(element);

    fireEvent.touchStart(element, {
      touches: [{ clientY: 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: 300 }],
    });
    fireEvent.touchEnd(element);

    fireEvent.transitionEnd(element, { target: undefined });

    // Just for coverage purposes (the case when the function doesn't do anything)
    fireEvent.touchEnd(background);

    // Assert
    expect(onClose).toBeCalledTimes(1);
  });

  test('It should trigger onOpen function', async () => {
    const onOpen = jest.fn();
    // Arrange
    const { getByTestId } = render(<MobileModal draggable onOpen={onOpen} />);

    const element = getByTestId(`test-modal`);

    fireEvent.touchStart(element, {
      touches: [{ clientY: window.innerHeight - 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: window.innerHeight - 300 }],
    });
    fireEvent.touchEnd(element);

    // Assert
    expect(onOpen).toBeCalledTimes(1);
  });

  test('It should block dragging greater than the specified top spacing', async () => {
    const onOpen = jest.fn();
    const viewport = window.innerHeight;
    const topLimit = viewport - mockedClientRects.height;
    // Arrange
    const { getByTestId } = render(
      <MobileModal draggable onOpen={onOpen} overflowHeight={20} />
    );

    const element = getByTestId(`test-modal`);

    fireEvent.touchStart(element, {
      touches: [{ clientY: viewport - 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: topLimit }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: viewport + 100 }],
    });

    const elementTopPosition = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPosition).toEqual(topLimit);
  });

  test('It should prevent transition end logic when the event was fired on any children', async () => {
    const onClose = jest.fn();
    // Arrange
    const { getByTestId } = render(
      <MobileModal draggable onClose={onClose} overflowHeight={20}>
        <button data-testid="button-test" onTransitionEnd={jest.fn()} />
      </MobileModal>
    );

    const button = getByTestId(`button-test`);

    fireEvent.transitionEnd(button);

    // Assert
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  test('It should prevent closing the modal when scrolled inside', async () => {
    const viewport = window.innerHeight;
    const maxTopPosition = window.innerHeight - mockedClientRects.height;
    // Arrange
    const { getByTestId } = render(
      <MobileModal draggable overflowHeight={20} />
    );

    const element = getByTestId(`test-modal`);

    fireEvent.touchStart(element, {
      touches: [{ clientY: viewport - 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: viewport - 100 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPosition = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert
    expect(elementTopPosition).toEqual(maxTopPosition);

    Object.defineProperty(element, 'scrollTop', {
      configurable: true,
      value: 15,
    });

    fireEvent.touchStart(element, {
      touches: [{ clientY: viewport + 20 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientY: viewport + 100 }],
    });
    fireEvent.touchEnd(element);

    const elementTopPositionAfterScroll = Number.parseInt(
      window
        .getComputedStyle(element)
        .transform.replace(/translateY\((\d+)px\)/, '$1'),
      10
    );

    // Assert that element stills open
    expect(elementTopPositionAfterScroll).toEqual(maxTopPosition);
  });
});
