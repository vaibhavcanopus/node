const express = require("express");
require("dotenv").config();
const path = require("path");
const url = require("url")
const app = new express();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const static_path = path.join(__dirname);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(static_path));
const Student = require("./database/conn");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "views");
const nodemailer = require("nodemailer");
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhanavaibhav23@gmail.com",
    pass: "dangerzone",
  },
});

app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});
app.get("/", async function (req, res, next) {
  try {
    res.render("login", {
      message: "",
    });
  } catch {}
});
app.post("/", async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Student.findOne({ email: email });
    const isCheked = await bcrypt.compare(password, useremail.password);
    if (isCheked) {
      req.session.email = email;
      res.redirect("/index");
    } else {
      res.render("login", {
        message: "incorrect Credential",
      });
    }
  } catch {
    res.send;
  }
});

app.get("/register", async function (req, res, next) {
  try {
    res.render("register", {
      message: "",
    });
  } catch {}
});
app.post("/register", async function (req, res, next) {
  try {
    const password = req.body.password;
    const cnfpassword = req.body.cnfpassword;
    if (password === cnfpassword) {
      const createStudent = new Student(req.body);
      await createStudent.save();
      res.redirect("/");
    } else {
      res.render("register", {
        message: "password not match",
      });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

app.get("/index", async function (req, res, next) {
  try {
    if (req.session.email) {
      res.render("index");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/logout", async (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
});

app.get("/resetpassword", (req, res, next) => {
  res.render("resetpassword", {
    message: "",
  });
});

app.post("/resetpassword", async function (req, res, next) {
  const email = req.body.email;
  const isvalid = await Student.findOne({ email });
  if (!isvalid) {
    res.render("resetpassword", {
      message: "user with this email does not exist",
    });
  }
  const token = jwt.sign({ _id: isvalid._id }, process.env.RESET_PASSWORD_KEY, {
    expiresIn: "5m",
  });
  const data = {
    from: "bhanavaibhav@gmail.com",
    to: email,
    subject: "Reset Password Link",
    html: `<h2> Please click on link to reset your password</h2>
            <p>${process.env.CLIENT_URL}/resetpasswords/${token}</p>`,
  };

  isvalid.updateOne({ resetlink: token }, (err, success) => {
    if (err) {
      res.render("resetpassword", {
        message: "reset password link error",
      });
    } else {
      transporter.sendMail(data, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.render("resetpassword", {
            message: "reset password link sent to the email",
          });
        }
      });
      //
    }
  });
});

app.get("/resetpasswords/:id", (req, res, next) => {
  const id = req.params.id;
  const check = jwt.verify(
    id,
    process.env.RESET_PASSWORD_KEY,
    (err, result) => {
      if (err) {
        res.render("passwordgetpage", {
          message: "Incorrect token or it expires",
          id: "",
        });
      } else {
        res.render("passwordgetpage", {
          message: "",
          id: id,
        });
      }
    }
  );
});

app.post("/resetpasswords/:id", async function(req, res, next){
    try{
        const id = req.body.ids;
        const check = jwt.verify(
            id,
            process.env.RESET_PASSWORD_KEY)
            if (!check) {
                res.render("passwordgetpage", {
                  message: "Incorrect token or it expires fadsssssssss",
                  id: "",
                });
              } else{
                        ids = req.body.ids;
                        const user = await Student.findOne({ resetlink: ids });
                         password = req.body.password;
                         cnfpassword = req.body.cnfpassword;
                         if (password === cnfpassword) {
                             password =await bcrypt.hash(password ,10)
                          await user.updateOne({ password });
                          res.redirect(
                            url.format({ pathname: "/", message: "" })
                          );
                        }else{
                            res.render("passwordgetpage", {
                                message: "password is not matched please enter again.",
                                id: ids,
                              });}
                
              
            }
    }catch(err){
        console.log(err)
        res.render("passwordgetpage", {
        message: "please try again your session is expired",
        id: "",
      });

    }
});








// app.post("/resetpasswords/:id", async (req, res, next) => {
//     const id = req.params.id;
//   try{
//     const check = jwt.verify(
//         id,
//         process.env.RESET_PASSWORD_KEY)
   
//     if (!check) {
//         res.render("passwordgetpage/:id", {
//           message: "Token expire please try again.",
//           id: "",
//         });
//       }else {
//         ids = req.body.ids;
//         const user = await Student.findOne({ resetlink: ids });
//         password = req.body.password;
//         cnfpassword = req.body.cnfpassword;
//         if (password === cnfpassword) {
//           await user.updateOne({ password });
    
//           res.redirect(
//             url.format({ pathname: "/", message: "" })
//           );
//         }else{
//             res.render("passwordgetpage", {
//                 message: "password is not matched please enter again.",
//                 id: ids,
//               });
            
    
//         }
//       }

//   }catch{ res.render("passwordgetpage", {
//     message: "please try again.",
//     id:"",
//   });}
  

  
// });

app.listen(8000, () => {
  console.log("running");
});
