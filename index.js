const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const database = require("./databaseconfig.js");
const methodOverride = require("method-override");
const orderRouter = require("./routes/order.js")
const storeRouter = require("./routes/store.js")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const sessionOptions = {
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: false
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(cookieParser("OASIS"))
app.use(session(sessionOptions))
app.use("/order", orderRouter)
app.use("/store", storeRouter)

app.get("/", (req, res) => {
  if(req.session.count){
    req.session.count += 1
  } else{
    req.session.count = 1
  }
  res.cookie("Store Name", "OASIS Jimma Juice Bar")
  res.cookie("Location", "3163 Broadway", { signed: true})
  let count = req.session.count
  res.render("index", {count});
});

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
