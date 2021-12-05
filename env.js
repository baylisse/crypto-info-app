import dotenv from "dotenv";
dotenv.config();
//console.log(process.env)
export default {
    database_url: process.env["DATABASE_URL"],
};
