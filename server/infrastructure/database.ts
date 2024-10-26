import { ClientSession, Db, MongoClient } from "mongodb";
process.loadEnvFile();
export class ConnectToDatabase{

    static instanceConnect : ConnectToDatabase;
    connection : MongoClient | undefined;
    db : Db | undefined
    session : ClientSession | undefined

    constructor() {
        if(typeof ConnectToDatabase.instanceConnect === 'object'){
            return ConnectToDatabase.instanceConnect;
        }
        ConnectToDatabase.instanceConnect = this;
    }
    async connectOpen(){
        try {
            this.connection = new MongoClient(`${process.env.MONGO_ACCESS}${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/`); //{ useNewUrlParser: true, useUnifiedTopology: true }

            await this.connection?.connect();

            this.db = await this.connection?.db(process.env.MONGO_DB_NAME);

            this.session = await this.connection.startSession()

            console.log('conexion exitosa')
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    async connectClose(){
        this.connection?.close();
    }
}