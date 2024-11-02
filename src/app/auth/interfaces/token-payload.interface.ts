export interface IAccessTokenPayload {
  email: string;
  sub: string;
  [key: string]: string | number | boolean | unknown;
}
