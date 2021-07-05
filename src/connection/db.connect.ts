import mongoose from 'mongoose';
import chalk, { BackgroundColor } from 'chalk';

class DatabaseConnect {

    constructor(private db_name = 'fm_db', private db_server = '127.0.0.1:27017') {
        this._connect()
    }
    user = 'shivam';
    user_password = 'EXUtMv6TUylbReDU'
    cloud_uri = `mongodb+srv://${this.user}:${this.user_password}@cluster0.eodcj.mongodb.net/${this.db_name}?retryWrites=true&w=majority`;
    local_uri = `mongodb://${this.db_server}/${this.db_name}`

    private _connect() {

        mongoose.connect(this.cloud_uri).then((res) => {
            console.log(chalk.yellow.italic('\n\t  --- Database Connection Successful --- \n'));
        }).catch(err => {
            console.log(chalk.red.inverse('\n*** Database connection error '))
            console.log(err)
        })
    }


    public disconnect() {
        mongoose.disconnect();
    }

}

export const db_connection = new DatabaseConnect();


