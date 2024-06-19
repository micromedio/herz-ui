import React from 'react';
import { fireEvent, render } from '../../tests/utils';
import { axe } from 'jest-axe';
import SubNavigationMenu from './SubNavigationMenu';

describe('Alert', () => {
  const items = [
    {
      label: 'License types',
      collapsedLabel: 'LT',
    },
    {
      label: 'Licenses',
      collapsedLabel: 'L',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render with two anchors', () => {
    // Arrange
    const { getAllByRole } = render(
      <SubNavigationMenu>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    expect(getAllByRole('listitem')).toHaveLength(2);
  });

  test('should render with two custom anchors', () => {
    // Arrange
    const { getAllByRole } = render(
      <SubNavigationMenu>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            <a>{item.label}</a>
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    expect(getAllByRole('listitem')).toHaveLength(2);
  });

  test('should collapse on button click', () => {
    // Arrange
    const { getByRole } = render(
      <SubNavigationMenu>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    const collapsibleButton = getByRole('button');
    fireEvent.click(collapsibleButton);
    const navigation = getByRole('navigation');
    expect(
      window.getComputedStyle(navigation.firstChild as HTMLUListElement).width
    ).toEqual('16px');
  });

  test('should expand on button click', () => {
    // Arrange
    const { getByRole } = render(
      <SubNavigationMenu>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    const collapsibleButton = getByRole('button');
    fireEvent.click(collapsibleButton);
    fireEvent.click(collapsibleButton);
    const navigation = getByRole('navigation');
    expect(
      window.getComputedStyle(navigation.firstChild as HTMLUListElement).width
    ).toEqual('164px');
  });

  test('should collapse hidden', () => {
    // Arrange
    const { getByRole } = render(
      <SubNavigationMenu>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    const collapsibleButton = getByRole('button');
    fireEvent.click(collapsibleButton);
    const navigation = getByRole('navigation');
    expect(navigation.firstChild).not.toBeVisible();
  });

  test('should collapse visible with short labels', () => {
    // Arrange
    const { getByRole } = render(
      <SubNavigationMenu collapsedHidden={false}>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem
            collapsedItem={item.collapsedLabel}
            key={item.label}
            selected={index === 0}
          >
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    const collapsibleButton = getByRole('button');
    fireEvent.click(collapsibleButton);
    const navigation = getByRole('navigation');
    expect(navigation.firstChild).toBeVisible();
  });

  test('should not be collapsible', () => {
    // Arrange
    const { queryByRole } = render(
      <SubNavigationMenu collapsible={false}>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem
            collapsedItem={item.collapsedLabel}
            key={item.label}
            selected={index === 0}
          >
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    const collapsibleButton = queryByRole('button');
    expect(collapsibleButton).not.toBeInTheDocument();
  });

  test('should trigger onCollapseButtonHover', () => {
    // Arrange
    const onCollapseButtonHover = jest.fn();
    const { getByRole } = render(
      <SubNavigationMenu onCollapseButtonHover={onCollapseButtonHover}>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    const collapsibleButton = getByRole('button');
    fireEvent.mouseEnter(collapsibleButton);
    fireEvent.mouseLeave(collapsibleButton);
    expect(onCollapseButtonHover).toHaveBeenNthCalledWith(1, true);
    expect(onCollapseButtonHover).toHaveBeenNthCalledWith(2, false);
  });

  test("should trigger an warning to the user if item and collapsedItem don't have matching types", () => {
    // Arrange
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {
      return;
    });
    render(
      <SubNavigationMenu collapsedHidden={false}>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  test('should trigger a throw an error when menu items are used outside a SubNavigationMenu', () => {
    // Arrange
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {
      return;
    });
    expect(() => {
      render(
        <div>
          {items.map((item, index) => (
            <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
              {item.label}
            </SubNavigationMenu.MenuItem>
          ))}
        </div>
      );
    }).toThrow(
      '<SubNavigationMenu.MenuItem> needs to be inside a <SubNavigationMenu> component'
    );
    expect(spy).toHaveBeenCalledTimes(4);
  });

  test('passes a11y check', async () => {
    // Arrange
    const { container } = render(
      <SubNavigationMenu>
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem key={item.label} selected={index === 0}>
            {item.label}
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
