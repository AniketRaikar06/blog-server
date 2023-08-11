import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://aniketraikar99:l5qsw8KwG5Nv8vb6@ac-xrhxe6d-shard-00-00.2hlocna.mongodb.net:27017,ac-xrhxe6d-shard-00-01.2hlocna.mongodb.net:27017,ac-xrhxe6d-shard-00-02.2hlocna.mongodb.net:27017/?ssl=true&replicaSet=atlas-9275l7-shard-0&authSource=admin&retryWrites=true&w=majority`;
   //const URL = 'mongodb+srv://sundaram:Sundaram%40mongodb19@cluster0.4tzh7zd.mongodb.net/?retryWrites=true&w=majority'; 
   try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;