import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from './routes/client.js';
import managmentRoutes from './routes/managment.js';
import generalRoutes from './routes/general.js';
import salesRoutes from './routes/sales.js';
/* CONFIGURATION */
dotenv.config();
const app  = express();
app.use(express.json());
//In order to make api calls from another server
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());




/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/managment", managmentRoutes);
app.use("/sales", salesRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => {
  console.log(`${error} did not connect`)
})