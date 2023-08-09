const User = require("../models/user");
  

exports.getUserById = async (req, res, next, id) => {
    try {
      
      const user = await User.findById({_id:id});
      
      if (!user) {
        return res.status(404).json({
          error: "User not found in the database"
        });
      }
      req.profile = user;
      next();
    } catch (err) {
      return res.status(500).json({
        error: "Something happened"
      });
    }
  };




exports.getUser = (req, res) => {
    //TODO: get back here for password
    return res.json(req.profile)
}
