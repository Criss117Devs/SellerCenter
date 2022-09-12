import Roles from "../models/roles.js";

const findByOne = async (req, res, next) => {
  const { userRol } = req.body;
    try {
      const role = await Roles.query({
        type: Roles.types.FIND,
        data: { userRol },
      });
     
      if (role.error) {
        return res.status(400).json({ message: user.error });
      }
      res.status(201).json({ message: "Get one role" });
      next();
    } catch (err) {
      next(err)
    }
};

export { findByOne };
