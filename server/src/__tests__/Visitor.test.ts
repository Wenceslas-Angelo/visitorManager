import supertest from "supertest";
import { Visitor } from "types";
import App from "../App";
import { DeleteUser, Login, Register } from "./Auth.test";
import { VisitorData, authData } from "./Mock";

const createVisitor = async (token: string, visitorData: Visitor) => {
  const response = await supertest(App)
    .post("/visitor")
    .set("Authorization", `bearer ${token}`)
    .send({ ...visitorData });

  return response;
};

const getAllVisitorToday = async (token: string) => {
  const response = await supertest(App)
    .get("/visitor/today")
    .set("Authorization", `bearer ${token}`);
  console.log(response.body);
  return response;
};

const getOneVisitor = async (token: string, visitorId: string) => {
  const response = await supertest(App)
    .get(`/visitor/${visitorId}`)
    .set("Authorization", `bearer ${token}`);
  return response;
};

const updateVisitor = async (
  token: string,
  visitorData: Visitor,
  visitorId: string
) => {
  const response = await supertest(App)
    .put(`/visitor/${visitorId}`)
    .set("Authorization", `bearer ${token}`)
    .send(visitorData);
  return response;
};

const updateEndTimeDate = async (token: string, visitorId: string) => {
  const response = await supertest(App)
    .put(`/visitor/checkout/${visitorId}`)
    .set("Authorization", `bearer ${token}`);
  return response;
};

const deleteOneVisitor = async (token: string, visitorId: string) => {
  const response = await supertest(App)
    .delete(`/visitor/${visitorId}`)
    .set("Authorization", `bearer ${token}`);

  return response;
};

describe("TEST VISITOR API", () => {
  let token: string;
  let userId: string;
  let visitorId: string;

  beforeAll(async () => {
    const registerResponse = await Register(authData);
    expect(registerResponse.status).toBe(201);
    const loginResponse = await Login(authData.matricule, authData.password);
    expect(loginResponse.status).toBe(200);
    userId = loginResponse.body.userId;
    token = loginResponse.body.token;
  });

  it("Create Visitor", async () => {
    const response = await createVisitor(token, { ...VisitorData, userId });
    expect(response.status).toBe(201);
    visitorId = response.body.result._id;
  });

  it("Get all visitor today", async () => {
    const response = await getAllVisitorToday(token);
    expect(response.status).toBe(200);
    expect(response.body.results.length).toBe(1);
  });

  it("Get one visitor", async () => {
    const response = await getOneVisitor(token, visitorId);
    expect(response.status).toBe(200);
    expect(response.body.visitor.name).toBe(VisitorData.name);
  });

  it("Update Visitor", async () => {
    const response = await updateVisitor(
      token,
      {
        ...VisitorData,
        name: "UZUMAKI",
        firstName: "Naruto",
      },
      visitorId
    );
    expect(response.status).toBe(201);
  });

  it("Update End Date Time Visitor", async () => {
    const response = await updateEndTimeDate(token, visitorId);
    expect(response.status).toBe(201);
  });

  it("Delete one visitor", async () => {
    const response = await deleteOneVisitor(token, visitorId);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    const response = await DeleteUser(userId, token);
    expect(response.status).toBe(200);
  });
});
