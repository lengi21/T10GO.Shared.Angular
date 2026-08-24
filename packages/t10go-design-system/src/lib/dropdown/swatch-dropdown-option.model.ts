export interface T10goSwatchDropdownOption {
  readonly value: string;
  readonly label: string;
  readonly colors: readonly string[];
  readonly description?: string;
  readonly disabled?: boolean;
}
