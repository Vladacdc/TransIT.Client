export class Statistics{
  fieldName: string;
  statistics: Array<number>;

  constructor(statistics: Partial<Statistics>) {
    this.fieldName = statistics.fieldName;
    this.statistics = statistics.statistics;
  }
}
