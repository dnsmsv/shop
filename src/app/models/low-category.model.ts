export class LowCategory {
  mediumCategoryId: string;
  id: string;
  name: string;

  constructor(mediumCategoryId?: string, id?: string, name?: string) {
    this.mediumCategoryId = mediumCategoryId;
    this.id = id;
    this.name = name;
  }
}
