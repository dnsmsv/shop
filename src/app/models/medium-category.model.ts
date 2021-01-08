export class MediumCategory {
  highCategoryId: string;
  id: string;
  name: string;

  constructor(highCategoryId?: string, id?: string, name?: string) {
    this.highCategoryId = highCategoryId;
    this.id = id;
    this.name = name;
  }
}
