import User from '../models/user.models.js';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

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
    res.send('Registrando');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario." });
  }
};

export const login = (req, res) => res.send("Inicio de sesión");
