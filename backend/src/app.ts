import express from "express";
import { authRouter } from "./api/router/auth-router";
import { userProfileRouter } from "./api/router/user-profile-router";
import { validateAuthorization } from "./api/middleware/auth-middleware";

const app = express();
const BASE_URL = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/profile`, validateAuthorization, userProfileRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at: http://localhost:${PORT}${BASE_URL}`);
});
