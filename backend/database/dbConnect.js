import mongoose from "mongoose"

const mongoConnect = () => {
    return mongoose.connect(process,env.MONGO_URI)
};

export default mongoConnect;
