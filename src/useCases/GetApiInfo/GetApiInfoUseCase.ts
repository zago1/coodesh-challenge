import ICronRepository from "../../repositories/ICronRepository";
import SystemService from "../../services/SystemService";

export default class GetApiInfoUseCase {

  constructor(
    private cronRepository: ICronRepository,
    private systemService: SystemService
  ) {}

  async execute() {
    const response = {
      memoryUsage: this.systemService.getMemoryUsage(),
      onlineTime: this.systemService.getTotalTimeOnline(),
      dbConnection: false,
      lastUpdate: null,
    }

    try {
      const cron = await this.cronRepository.findLastOne();
      response.dbConnection = true;
      response.lastUpdate = {
        dateTime: cron.dateTime,
        status: cron.status
      };
    } catch (err) {
      response.dbConnection = false;
    }
    
    return response;
  }
}
