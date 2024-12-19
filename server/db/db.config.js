//importing mongoose

import mongoose from "mongoose";

//Function For Connecting With database
const connectDb = (app) => {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("database Connected Succesfully...");
    app.listen(process.env.PORT, () => {
      console.log(`App is Running at port: ${process.env.PORT}`);
    });
  });
};

//exporting the ConnectDb
export default connectDb;
