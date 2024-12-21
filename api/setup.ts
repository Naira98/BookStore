import { server } from "./src/server";

afterAll(() => server.close());

