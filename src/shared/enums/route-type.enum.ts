export enum RouteTypeEnum {
  // public routes that everyone can use
  PUBLIC = 'PUBLIC',
  // routes that only admin and operators have access to
  ADMIN = 'ADMIN',
  // routes that any registered user can use
  BASE = 'BASE',
  // routes that can be both public or user with token apply, if the user has token, the userId will be used in that route
  OPTIONAL = 'OPTIONAL',
}
