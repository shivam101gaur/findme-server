import mongoose from 'mongoose';
import chalk, { BackgroundColor } from 'chalk';

class DatabaseConnect {

    constructor(private db_name = 'fm_db', private db_server = '127.0.0.1:27017') {
        this._connect()
    }

    private _connect() {
        mongoose.connect(`mongodb://${this.db_server}/${this.db_name}`).then((res) => {
            console.log(chalk.yellow.italic('\n\t  --- Database Connection Successful --- \n'));
        }).catch(err => {
            console.log(chalk.red.inverse('\n*** Database connection error '))
            console.log(err)
        })
    }

    
    public disconnect(){
       mongoose.disconnect();
    }

}

export const db_connection = new DatabaseConnect();
