export default interface IRepositoryResponse<T> {
  status: boolean;
  value: T | null;
}