import { act, renderHook } from '@testing-library/react-hooks';
import useRowSelection from './useRowSelection';

describe('useRowSelection', () => {
  describe('controlled selection', () => {
    test('passed selectedRowIds is used for the initial value', () => {
      // Arrange
      const selectedRowIds = { 1: true, 35: true };
      const { result } = renderHook(() => useRowSelection({ selectedRowIds }));

      // Assert
      expect(result.current.selectedRowIds).toEqual(selectedRowIds);
    });

    describe('toggleRowSelected', () => {
      test('onChange is called', () => {
        // Arrange
        const selectedRowIds = { 1: true, 35: true };
        const onChange = jest.fn();
        const { result } = renderHook(() =>
          useRowSelection({ selectedRowIds, onChange })
        );

        // Act
        act(() => {
          result.current.toggleRowSelected(60);
        });

        // Assert
        expect(onChange).toHaveBeenCalledWith({ ...selectedRowIds, 60: true });
      });

      test('selectedRowIds is controlled, only changes if passed value changes', () => {
        const selectedRowIds: Record<number, boolean> = { 1: true, 35: true };
        const onChange = jest.fn();
        const { result, rerender } = renderHook(() =>
          useRowSelection({ selectedRowIds, onChange })
        );

        act(() => {
          result.current.toggleRowSelected(60);
        });
        expect(result.current.selectedRowIds).toEqual(selectedRowIds);

        selectedRowIds[99] = true;
        rerender();
        expect(result.current.selectedRowIds).toEqual({
          1: true,
          35: true,
          99: true,
        });
      });
    });
  });

  describe('uncontrolled row selection', () => {
    test('toggleRowSelected', () => {
      const { result } = renderHook(() =>
        useRowSelection({ selectedRowIds: { 125: true, 100: true } })
      );

      act(() => result.current.toggleRowSelected(105));
      expect(result.current.selectedRowIds).toEqual({
        125: true,
        100: true,
        105: true,
      });

      act(() => result.current.toggleRowSelected(125));
      expect(result.current.selectedRowIds).toEqual({
        100: true,
        105: true,
      });
    });

    test('setRowsSelected', () => {
      // Arrange
      const { result } = renderHook(() =>
        useRowSelection({ selectedRowIds: { 49: true } })
      );

      act(() => result.current.setRowsSelected([1, 2, 3, 4, 5], true));
      expect(result.current.selectedRowIds).toEqual({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        49: true,
      });

      act(() => result.current.setRowsSelected([3, 4, 5, 6, 7, 8], false));
      expect(result.current.selectedRowIds).toEqual({
        1: true,
        2: true,
        49: true,
      });
    });
  });
});
