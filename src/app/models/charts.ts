export interface ChartsModel {
  name: string;
  value?: number;
  series?: Series[];
}

interface Series {
  name: string;
  value: number;
}
