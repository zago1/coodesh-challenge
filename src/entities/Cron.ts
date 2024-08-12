export type CronStatus = 'running' | 'success' | 'error';

export default class Cron {
  public readonly id: string;
  
  public dateTime: Date;
  public status: CronStatus

  constructor(props: Omit<Cron, 'id'>, id?: string) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}