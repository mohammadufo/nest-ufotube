export class Pagination {
  page: number;

  size: number;

  total: number;

  skip?: number;
}

export class Paginate<TData> {
  constructor(items: TData[], pagination: Pagination) {
    this.items = items;
    this.pagination = pagination;
  }

  pagination: Pagination;

  items: TData[];
}
