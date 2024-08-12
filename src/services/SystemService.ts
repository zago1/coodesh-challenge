import prismaClient from "../prisma";
import { getMemoryUsage } from "../utils";

export default class SystemService {
  startTime: Date;

  constructor() {
    this.startTime = new Date();
  }

  getMemoryUsage() {
    return getMemoryUsage();
  }

  getTotalTimeOnline() {
    return Math.abs((new Date()).getTime() - this.startTime.getTime());
  }
}