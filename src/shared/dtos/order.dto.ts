export class OrderDto {
  constructor(obj?: Partial<OrderDto>) {
    if (obj) Object.assign(this, obj);
  }

  orderBy: string;

  order: string;
}
