import MongoCronRepository from "../../repositories/implementations/MongoCronRepository";
import SystemService from "../../services/SystemService";
import GetApiInfoController from "./GetApiInfoController";
import GetApiInfoUseCase from "./GetApiInfoUseCase";

const cronRepository = new MongoCronRepository;
const systemService = new SystemService();

const getApiInfoUseCase = new GetApiInfoUseCase(
  cronRepository,
  systemService
);

const getApiInfoController = new GetApiInfoController(
  getApiInfoUseCase
);

export { getApiInfoUseCase, getApiInfoController };