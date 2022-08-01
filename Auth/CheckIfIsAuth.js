const { verify } = require("jsonwebtoken");
const { KEY } = require("../config");

const checkIfIsAuth = (context) => {
  const header = context.req.headers.authorization;

  if (!header) throw new Error("Autorización no proporcionada");

  const token = header.split("Bearer")[1];

  if (!token) throw new Error("Token no proporcionado");

  try {
    const user = verify(token, KEY);
    return user;
  } catch (error) {
    throw new Error("Token expirado");
  }
};
