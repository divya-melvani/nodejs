const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/auth");
const db = require("./config/database");

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.findOne({ where: { email } });
//     if (user) {
//       return res.status(404).json({ message: "User already exists with this email please try with different email" });
//     }
//     // var regex = new RegExp(/^(?=.*\d).{8,}$/);
//     var regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
//     var checkPassword = regex.test(password);
//     if(email.length > 0 && password.length > 0) {
//       if(!checkPassword) {
//         return res.status(401).json({ message: "Password Must Be at Least Minimum 8 Characters, Must have One Capital character, One small character & One Symbol" });
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = await User.create({ name, email, password: hashedPassword });
//       res.status(201).json({ message: "User registered successfully", user: newUser });
//     } else {
//       return res.status(401).json({ message: "Email and Password Both are required" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const register = async (req, res) => {
    const {name, email, password} = req.body;
    const uemail = await User.findOne({ where: { email }});
    if (uemail) {
        return res.json({message:"aready used"})
    }
    var regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    var checkPassword = regex.test(password);
    if(!checkPassword) {
    return res.json({ message: "Password Must Be at Least Minimum 8 Characters, Must have One Capital character, One small character & One Symbol" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    }).then((user) => {
        return res.json({message:"user added"})
    })
    .catch(error => {
        res.json({error:error.message})
    });
}


// const register = (req, res) => {
//     const {name, email, password} = req.body;
//     User.create({
//         name:name,
//         email:email,
//         password:password
//     }).then((user) => {
//         return res.json({message:"user added"})
//     })
//     .catch(error => {
//         res.json({error:error.message})
//     });
// }

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {login, register}
