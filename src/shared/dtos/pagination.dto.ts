import { IsNumber, IsPositive } from 'class-validator';
import { Pagination } from '../classes/paginate';
import { Type } from 'class-transformer';

export class PaginationDto {
  constructor(obj?: Partial<PaginationDto>) {
    if (obj) Object.assign(this, obj);
  }

  @IsPositive()
  @IsNumber()
  page = 0;

  @IsPositive()
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
