import {
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  // UseExpandedHooks,
  // UseExpandedInstanceProps,
  // UseExpandedOptions,
  // UseExpandedRowProps,
  // UseExpandedState,
  // UseFiltersColumnOptions,
  // UseFiltersColumnProps,
  // UseFiltersInstanceProps,
  // UseFiltersOptions,
  // UseFiltersState,
  // UseGlobalFiltersColumnOptions,
  // UseGlobalFiltersInstanceProps,
  // UseGlobalFiltersOptions,
  // UseGlobalFiltersState,
  // UseGroupByCellProps,
  // UseGroupByColumnOptions,
  // UseGroupByColumnProps,
  // UseGroupByHooks,
  // UseGroupByInstanceProps,
  // UseGroupByOptions,
  // UseGroupByRowProps,
  // UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  // UseRowSelectHooks,
  // UseRowSelectInstanceProps,
  // UseRowSelectOptions,
  // UseRowSelectRowProps,
  // UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from "react-table"

declare module "react-table" {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<
    D extends Record<string, unknown>
  > extends UsePaginationOptions<D>,
      // UseFiltersOptions<D>,
      // UseGlobalFiltersOptions<D>,
      // UseGroupByOptions<D>,
      // UseExpandedOptions<D>,
      UseResizeColumnsOptions<D>,
      // UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, unknown> {}

  export type Hooks<
    D extends Record<string, unknown> = Record<string, unknown>
  > = UseSortByHooks<D>

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseColumnOrderInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      // UseExpandedInstanceProps<D>,
      // UseFiltersInstanceProps<D>,
      // UseGlobalFiltersInstanceProps<D>,
      // UseGroupByInstanceProps<D>,
      // UseRowSelectInstanceProps<D>,
      UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseColumnOrderState<D>,
      // UseExpandedState<D>,
      // UseFiltersState<D>,
      // UseGlobalFiltersState<D>,
      // UseGroupByState<D>,
      UsePaginationState<D>,
      UseResizeColumnsState<D>,
      // UseRowSelectState<D>,
      UseRowStateState<D>,
      UseSortByState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnOptions<D>,
      // UseFiltersColumnOptions<D>,
      // UseGlobalFiltersColumnOptions<D>,
      // UseGroupByColumnOptions<D>,
      UseResizeColumnsColumnOptions<D> {
    /**
     * @enum start Aligns column text to the start of the column
     */
    align?: "start" | "end" | "center"
    highlight?: boolean
    fixedWidth?: boolean
  }

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnProps<D>,
      // UseFiltersColumnProps<D>,
      // UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D> {}

  export type Cell<
    D extends Record<string, unknown> = Record<string, unknown>
  > = UseRowStateCellProps<D>
  // UseGroupByCellProps<D> {}

  export type Row<
    D extends Record<string, unknown> = Record<string, unknown>
  > = UseRowStateRowProps<D>
}
