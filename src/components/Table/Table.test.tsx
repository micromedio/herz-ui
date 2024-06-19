import React from 'react';
import { render, screen } from '../../tests/utils';
import { axe } from 'jest-axe';
import Table from './Table';
import userEvent from '@testing-library/user-event';

describe('Table', () => {
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      highlight: true,
    },
    {
      Header: 'NAME',
      accessor: 'name',
    },
  ];

  const data = [
    {
      id: '1',
      name: 'FIRST_TEST_NAME',
    },
    {
      id: '2',
      name: 'SECOND_TEST_NAME',
    },
    {
      id: '3',
      name: 'THIRD_TEST_NAME',
    },
  ];

  test('rows are shown', async () => {
    // Arrange
    render(<Table columns={columns} data={data} />);

    // Assert
    expect(screen.getByText('FIRST_TEST_NAME')).toBeInTheDocument();
    expect(screen.getByText('SECOND_TEST_NAME')).toBeInTheDocument();
    expect(screen.getByText('THIRD_TEST_NAME')).toBeInTheDocument();
  });

  test('sorts by row on header click', async () => {
    // Arrange
    render(
      <Table
        columns={columns}
        data={[
          {
            id: '1',
            name: 'XXX_TEST_NAME',
          },
          {
            id: '2',
            name: 'AAA_TEST_NAME',
          },
          {
            id: '3',
            name: 'HHH_TEST_NAME',
          },
          {
            id: '4',
            name: 'DDD_TEST_NAME',
          },
        ]}
      />
    );

    // sorts by name ascending
    userEvent.click(screen.getByText('NAME'));
    let rows = screen
      .getAllByText(/.*test_name/i)
      .map((item) => item.textContent);
    expect(rows).toMatchObject([
      'AAA_TEST_NAME',
      'DDD_TEST_NAME',
      'HHH_TEST_NAME',
      'XXX_TEST_NAME',
    ]);

    // sorts by name descending
    userEvent.click(screen.getByText('NAME'));
    rows = screen.getAllByText(/.*test_name/i).map((item) => item.textContent);
    expect(rows).toMatchObject([
      'XXX_TEST_NAME',
      'HHH_TEST_NAME',
      'DDD_TEST_NAME',
      'AAA_TEST_NAME',
    ]);
  });

  test('shown items change on page change', async () => {
    // Arrange
    const data = Array.from({ length: 15 })
      .fill('')
      .map((_, index) => ({
        id: `ID_${index}`,
        name: `TEST_NAME_${index}`,
      }));

    render(
      <Table
        columns={columns}
        data={data}
        initialPageIndex={0}
        initialPageSize={5}
      />
    );

    // first page shows up
    [0, 1, 2, 3, 4].forEach((index) => {
      expect(screen.getByText(`TEST_NAME_${index}`)).toBeInTheDocument();
    });
    [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].forEach((index) => {
      expect(screen.queryByText(`TEST_NAME_${index}`)).not.toBeInTheDocument();
    });

    // change to page 2
    userEvent.click(screen.getByText('2'));
    // second page shows up
    [5, 6, 7, 8, 9].forEach((index) => {
      expect(screen.getByText(`TEST_NAME_${index}`)).toBeInTheDocument();
    });
    [0, 1, 2, 3, 4, 10, 11, 12, 13, 14].forEach((index) => {
      expect(screen.queryByText(`TEST_NAME_${index}`)).not.toBeInTheDocument();
    });
  });

  test('onRowSelectionChange is called with new selected rows after a row is selected', () => {
    // Arrange
    const data = Array.from({ length: 15 })
      .fill('')
      .map((_, index) => ({
        id: `ID_${index}`,
        name: `TEST_NAME_${index}`,
      }));

    const onRowSelectionChange = jest.fn();
    const initialSelectedRowIds = {
      ID_4: true,
    };

    const props = {
      columns: columns,
      data: data,
      initialPageIndex: 0,
      initialPageSize: 5,
      rowsSelectable: true,
      selectedRowIds: initialSelectedRowIds,
      onRowSelectionChange: onRowSelectionChange,
    };

    render(<Table {...props} />);

    // Act
    userEvent.click(screen.getByLabelText('select row ID_2'));

    // Assert
    expect(onRowSelectionChange).toHaveBeenCalledTimes(1);
    expect(onRowSelectionChange).toHaveBeenCalledWith({
      ID_4: true,
      ID_2: true,
    });
  });

  test('checkboxes are checked when clicked', () => {
    // Arrange
    const data = Array.from({ length: 15 })
      .fill('')
      .map((_, index) => ({
        id: `ID_${index}`,
        name: `TEST_NAME_${index}`,
      }));

    const initialSelectedRowIds = {
      ID_4: true,
    };

    render(
      <Table
        columns={columns}
        data={data}
        initialPageSize={10}
        rowsSelectable
        selectedRowIds={initialSelectedRowIds}
      />
    );

    expect(screen.getByLabelText('select row ID_4')).toBeChecked();
    expect(screen.getByLabelText('select row ID_2')).not.toBeChecked();

    userEvent.click(screen.getByLabelText('select row ID_2'));

    expect(screen.getByLabelText('select row ID_2')).toBeChecked();
  });

  test('passes a11y check', async () => {
    // Arrange
    const { container } = render(
      <Table columns={columns} data={data} rowsSelectable />
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
