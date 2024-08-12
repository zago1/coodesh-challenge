import Cron, { CronStatus } from "../entities/Cron";

export default interface ICronRepository {
  findLastOne(): Promise<Cron | null>;
  insert(cron: Cron): Promise<Cron>;
  update(id: string, status: CronStatus): Promise<Cron>;
}