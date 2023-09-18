import mongoose from "mongoose";
const connection = async (Username, Password) => {
  const URL = `mongodb+srv://${Username}:${Password}@blog-application.srs7umu.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewURLParser: true });
    console.log("Database Connected successfully");
  } catch (error) {
    console.log("error while connecting database", error);
  }
};

export default connection;
