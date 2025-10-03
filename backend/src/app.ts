import express from "express";
import { authRouter } from "./modules/auth/auth-router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*app.post("/api/v1/auth", async (req, res) => {
  const { email, password } = req.body;
  const result = await client.auth.signUp({
    email: email,
    password: password,
  });


  res.json({ result: result, status: "success" });
});

app.get("/api/v1", async (req, res) => {
  const user = {
    username: "anurag",
    email: "anurag@gmail.com",
    password_hash: "123456",
    first_name: "Anurag",
    last_name: "Verma",
    address: "Noida, UP",
    profile_picture_url: "anurag_pic_png",
  };

  const result = await client.from("users").insert(user).select();

  res.json({ result: result, status: "success" });
});*/

app.use("/api/v1", authRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at: http://localhost:${PORT}/api/v1`);
});
