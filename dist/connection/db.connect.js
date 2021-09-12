"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
class DatabaseConnect {
    constructor(db_name = 'fm_db', db_server = '127.0.0.1:27017') {
        this.db_name = db_name;
        this.db_server = db_server;
        this.user = 'shivam';
        this.user_password = 'EXUtMv6TUylbReDU';
        this.cloud_uri = `mongodb+srv://${this.user}:${this.user_password}@cluster0.eodcj.mongodb.net/${this.db_name}?retryWrites=true&w=majority`;
        this.local_uri = `mongodb://${this.db_server}/${this.db_name}`;
        this._connect();
    }
    _connect() {
        mongoose_1.default.connect(this.cloud_uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then((res) => {
            console.log(chalk_1.default.yellow.italic('\n\t  --- Database Connection Successful --- \n'));
        }).catch(err => {
            console.log(chalk_1.default.red.inverse('\n*** Database connection error '));
            console.log(err);
        });
    }
    disconnect() {
        mongoose_1.default.disconnect();
    }
}
exports.db_connection = new DatabaseConnect();
//# sourceMappingURL=db.connect.js.map