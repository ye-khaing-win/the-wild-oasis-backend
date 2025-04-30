export interface Constructable {
  new (...args: any[]): NonNullable<unknown>;
}