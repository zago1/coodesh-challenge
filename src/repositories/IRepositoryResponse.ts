export interface IRepositoryResponseMetadata {
  totalRows?: number;
}

export default interface IRepositoryResponse<T> {
  status: boolean;
  value: T | null;
  metadata?: IRepositoryResponseMetadata
}