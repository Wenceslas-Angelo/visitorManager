import supertest from "supertest";
import { Visitor } from "types";
import App from "../App";
import { Login, Register } from "./Auth.test";
import { authData } from "./Mock";
import { visitors } from "./Mock/visitorData";

const createVisitor = async (token: string, visitorData: Visitor) => {
  const response = await supertest(App)
    .post("/visitor")
    .set("Authorization", `bearer ${token}`)
    .send({ ...visitorData });

  return response;
};

describe("TEST VISITOR API", () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const registerResponse = await Register(authData);
    expect(registerResponse.status).toBe(201);
    const loginResponse = await Login(authData.matricule, authData.password);
    expect(loginResponse.status).toBe(200);
    userId = loginResponse.body.userId;
    token = loginResponse.body.token;
  });

  it("Create Visitor", async () => {
    for (const visitor of visitors) {
      const response = await createVisitor(token, { ...visitor, userId });
      expect(response.status).toBe(201);
    }
  });
});
