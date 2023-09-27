import User from '../models/user.models.js';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'


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
      console.log("Ya existe un usuario con el mismo nombre de usuario o correo electrónico.");
      return res.status(400).json({ error: "Ya existe un usuario con el mismo nombre de usuario o correo electrónico." });
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
    
    const token= await createAccessToken({id:newUser.id});
    res.cookie('token', token);
    res.json({message:"Usuario creado correctamente"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario." });
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
      console.log("Usuario no encontrado.");
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      console.log("Contraseña incorrecta.");
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    const token= await createAccessToken({id:existingUser.id});
    res.cookie('token', token);
    res.json({
        nombre: existingUser.nombre,
        apellido:existingUser.apellido,
        correo:existingUser.correo,
        telefono:existingUser.telefono,
        });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión." });
  }
};

export const logout = async (req, res) =>{
    res.cookie('token', "", {
      expires:new Date(0)
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