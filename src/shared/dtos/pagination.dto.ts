import { IsNumber } from 'class-validator';
import { Pagination } from '../classes/paginate';

export class PaginationDto {
  constructor(obj?: Partial<PaginationDto>) {
    if (obj) Object.assign(this, obj);
  }

  @IsNumber()
  page = 0;

  @IsNumber()
  size = 100;

  get skip() {
    return (this.page - 1) * this.size;
  }

  getPagination(total): Pagination {
    const pagination: Pagination = new Pagination();
    pagination.page = this.page;
    pagination.size = this.size;
    pagination.skip = this.skip;
    pagination.total = total;
    return pagination;
  }
}
