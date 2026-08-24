/** A route-aware item rendered by `t10go-sidebar`. */
export interface T10goNavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly route?: string;
  readonly children?: readonly T10goNavigationItem[];
}
