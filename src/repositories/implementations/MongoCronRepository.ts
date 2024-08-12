import Cron, { CronStatus } from "../../entities/Cron";
import prismaClient from "../../prisma";
import ICronRepository from "../ICronRepository";

export default class MongoCronRepository implements ICronRepository {
  private cronFormatter(cron: { date_time: Date, status: string, id: string }) {
    return new Cron({
      dateTime: cron.date_time,
      status: cron.status as CronStatus
    }, cron.id);
  }

  async findLastOne(): Promise<Cron> {
    const cron = await prismaClient.cronUpdate.findFirst({
      orderBy: {
        date_time: "desc"
      }
    });

    if (!!cron) {
      return this.cronFormatter(cron);
    }

    return null;

  }

  async insert(cron: Cron): Promise<Cron> {
    const insertedCron = await prismaClient.cronUpdate.create({
      data: { date_time: cron.dateTime, status: cron.status },
    });

    return new Cron({
      dateTime: insertedCron.date_time,
      status: insertedCron.status as CronStatus
    }, insertedCron.id)
  }

  async update(id: string, status: CronStatus): Promise<Cron> {
    const updatedCron = await prismaClient.cronUpdate.update({
      data: { status: status },
      where: { id },
    });

    return this.cronFormatter(updatedCron);
  }
  
}