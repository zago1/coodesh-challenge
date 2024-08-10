export default class FoodFileInfo {
  id: string;
  name: string;
  startLine: number;
  lastUpdate: string;

  constructor(props: Omit<FoodFileInfo, 'id'>, id?: string) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}