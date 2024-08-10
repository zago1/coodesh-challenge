import { PRODUCT_STATUS } from "../enums";

export type ProductStatus = 
  PRODUCT_STATUS.published | 
  PRODUCT_STATUS.trash | 
  PRODUCT_STATUS.draft;

export default class Product {

  public readonly id: string;

  public code: string;
  public status: ProductStatus;
  public importedAt: string;
  public url: string;
  public creator: string;
  public createdAt: string;
  public lastModifiedAt: string;
  public productName: string;
  public quantity: string;
  public brands: string;
  public categories: string;
  public labels: string;
  public cities: string;
  public purchasePlaces: string;
  public stores: string;
  public ingredientsText: string;
  public traces: string;
  public servingSize: string;
  public servingQuantity: number;
  public nutriscoreScore: number;
  public nutriscoreGrade: string;
  public mainCategory: string;
  public imageUrl: string;

  constructor(props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}