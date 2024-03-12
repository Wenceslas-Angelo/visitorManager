import supertest from "supertest";
import { AuthData } from "types";
import App from "../App";
import { authData } from "./Mock";

export const Login = async (matricule: string, password: string) => {
  const response = await supertest(App).post("/auth/login").send({
    matricule,
    password,
  });
  return response;
};

export const Register = async (userData: AuthData) => {
  const response = await supertest(App)
    .post("/auth/register")
    .send({
      ...userData,
    });
  return response;
};

export const DeleteUser = async (userId: string, token: string) => {
  const response = await supertest(App)
    .delete(`/auth/delete/${userId}`)
    .set("Authorization", `bearer ${token}`);
  return response;
};

describe("AUTH USER", () => {
  let id: string;
  let token: string;

  it("Register with complete information", async () => {
    const response = await Register(authData);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("Login with truth information", async () => {
    const response = await Login(authData.matricule, authData.password);
    expect(response.status).toBe(200);
    id = response.body.userId;
    token = response.body.token;
  });

  it("Login with wrong password", async () => {
    const response = await Login(authData.matricule, "wrong password");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Wrong password");
  });

  it("Login with wrong matricule", async () => {
    const response = await Login("wrong matricule", authData.password);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("User not found");
  });

  it("Delete User", async () => {
    const response = await DeleteUser(id, token);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");
  });
});
