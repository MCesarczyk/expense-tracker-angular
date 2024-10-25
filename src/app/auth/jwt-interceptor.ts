import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { map, switchMap } from "rxjs";

export const jtwInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return authService.accessToken$.pipe(
    map((token) => {
      if (token) {
        return req.clone({
          url: req.url,
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      return req;
    }),
    switchMap((req) => next(req))
  )
}