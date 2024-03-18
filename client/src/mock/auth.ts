import { http, HttpResponse } from "msw";

const authHandlers = [
  http.post("http://localhost:8000/auth/register", () => {
    return HttpResponse.json({
      message: "User registered successfully",
    });
  }),
];

export default authHandlers;
