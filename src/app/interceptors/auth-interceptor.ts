import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
//tutorial for this: https://app.pluralsight.com/ilx/video-courses/c13af9f3-e510-4a59-baf0-cbf5b325dd78/bd20a284-8689-45e4-b71c-6e8c3f4ca176/728dd9fb-bcbd-4305-8f27-415de43c3b2e
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let auth = undefined;
        let token = localStorage.getItem("token");

        if (token) {
            auth = JSON.parse(token);
        }

        if (auth) {
            //clone request, replace original headers with new headers containing authorization
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + auth)
            });

            //send cloned request with header to the next handler
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
