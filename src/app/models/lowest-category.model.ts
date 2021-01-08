export class LowestCategory {
  lowCategoryId: string;
  id: string;
  name: string;

  constructor(lowCategoryId?: string, id?: string, name?: string) {
    this.lowCategoryId = lowCategoryId;
    this.id = id;
    this.name = name;
  }
}
