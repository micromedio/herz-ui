declare module "values.js" {
  class Values {
    constructor(public readonly color: string) {}
    tints(weight: number): array<Values>
  }

  export = Values
}
