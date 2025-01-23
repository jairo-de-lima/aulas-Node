import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.post("/usuarios", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
      },
    });
    console.log(user);

    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(user);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "User deleted successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// http://localhost:3000

// reg = requisao
// res = resposta

/* 
    MongoDB

    jairodelima94
    CcBCn1MaQsa1sUJf

*/

// CRUD
/*
 CREATE = criar
 READ = ler
 UPDATE = editar
 DELETE = deletar
*/

/* tratamento de erros
try {// código que pode gerar erro} catch (error) { // tratamento do erro
console.log(error);}
*/
