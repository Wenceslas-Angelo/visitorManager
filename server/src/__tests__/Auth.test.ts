import supertest from "supertest";
import App from "../App";
import { authData } from "./Mock";

export const Login = async (name: string, password: string) => {
  const response = await supertest(App).post("/auth/login").send({
    name,
    password,
  });
  return response;
};

export const Register = async (name: string, password: string) => {
  const response = await supertest(App).post("/auth/register").send({
    name,
    password,
  });
  return response;
};

export const DeleteUser = async (password: string) => {
  const response = await supertest(App).delete("/auth/user/delete").send({
    password,
  });
  return response;
};

describe("AUTH USER", () => {
  let id: string;

  it("Register with complete information", async () => {
    const response = await Register(authData.name, authData.password);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("Register with incomplete information", async () => {
    const response = await Register(authData.name, "");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Information not complete");
  });

  it("Login with truth information", async () => {
    const response = await Login(authData.name, authData.password);
    expect(response.status).toBe(200);
  });

  it("Login with wrong password", async () => {
    const response = await Login(authData.name, "wrong password");
    expect(response.status).toBe(401);
  });

  it("Login with wrong id", async () => {
    const response = await Login("wrong name", authData.password);
    expect(response.status).toBe(401);
  });

  it("Delete User", async () => {
    const response = await DeleteUser(authData.password);
    expect(response.status).toBe(200);
  });
});
