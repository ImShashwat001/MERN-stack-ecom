const User = require("../models/user");

// exports.getUserById = async (req, res, next, id) => {
//     const user = await User.findById(id);
//     user.exec((err, user) => {
//       if (err || !user) {
//         return res.status(400).json({
//           error: "No user was found in DB"
//         });
//       }
//       req.profile = user;
//       next();
//     });
//   };
  

exports.getUserById = async (req, res, next, id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          error: "User not found in the database"
        });
      }
      req.profile = user;
      next();
    } catch (err) {
      return res.status(500).json({
        error: "Internal server error"
      });
    }
  };




exports.getUser = (req, res) => {
    //TODO: get back here for password
    return res.json(req.profile)
}
