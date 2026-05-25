/* CREAR USUARIO */
export const postCreateUser = async (req, res, next) => {
  try {

    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol
    } = req.body;

    const newUser = await usersService.createUser({
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol
    });

    res.status(201).json(newUser);

  } catch (err) {
    return next(err);
  }
};