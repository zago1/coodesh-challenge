import { ProductStatus } from "../../entities/Product";

export default interface UpdateProductDTO {
  code: string;
  status: ProductStatus;
  importedAt: string;
  url: string;
  creator: string;
  createdAt: string;
  lastModifiedAt: string;
  productName: string;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchasePlaces: string;
  stores: string;
  ingredientsText: string;
  traces: string;
  servingSize: string;
  servingQuantity: number;
  nutriscoreScore: number;
  nutriscoreGrade: string;
  mainCategory: string;
  imageUrl: string;
}