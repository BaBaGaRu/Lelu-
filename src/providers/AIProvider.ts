export default interface AIProvider {
  readonly name: string;
  readonly enabled: boolean;
  readonly priority: number;

  canHandle(input: string): boolean;

  generate(input: string): Promise<string>;
}