import User from '../models/user.models.js';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js'
import jwt  from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';


export const register = async (req, res) => {
  const { nombre, apellido, telefono, correo, username, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { correo: correo }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json(["Ya existe un usuario con el mismo username o correo electrónico."]);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nombre,
      apellido,
      telefono,
      correo,
      username,
      password: passwordHash,
    });

    console.log("Usuario creado");

    const token = await createAccessToken({ id: newUser.id });
    res.json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al registrar usuario."]);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {

    const existingUser = await User.findOne({
      where: {
        username: username
      }
    });

    if (!existingUser) {
      return res.status(404).json(["Usuario no encontrado."]);
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      console.log("Contraseña incorrecta.");
      return res.status(401).json(["Contraseña incorrecta."]);
    }

    const token = await createAccessToken({ id: existingUser.id });
    res.cookie('token', token);
    res.json({
      nombre: existingUser.nombre,
      apellido: existingUser.apellido,
      correo: existingUser.correo,
      telefono: existingUser.telefono,
      usernam: existingUser.username,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al iniciar sesión."]);
  }
};

export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200)

};

export const profile = async (req, res) => {

  try {
    const userFound = await User.findByPk(req.user.id);

    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    return res.json({
      id: userFound.id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      correo: userFound.correo,
      telefono: userFound.telefono
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies
  if (!token) return res.status(401).json({ message: "Sin autorizacion" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Sin autorizacion" });

    const userFound = await User.findByPk(user.id)
    if (!userFound) return res.status(401).json({ message: "Sin autorizacion" });

    return res.json({
      id: userFound.id,
      username: userFound.username,
      correo: userFound.correo,
      telefono: userFound.telefono,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      userna: userFound.username
    })

  })
};