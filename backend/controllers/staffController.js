import db from "./db";

const register = async (name, dob, phoneNumber) => {
    const sql = "INSERT INTO staff (name, dob, phoneNumber) VALUES ?";
    const value = [[name, dob, phoneNumber]];
    return await db.makeQuery(sql, value);
}

const change = async (name, dob, phoneNumber) => {
    const sql = "INSERT INTO staff (name, dob, phoneNumber) VALUES ?";
    const value = [[name, dob, phoneNumber]];
    return await db.makeQuery(sql, value);
}

const remove = async (name, dob, phoneNumber) => {
    const sql = "INSERT INTO staff (name, dob, phoneNumber) VALUES ?";
    const value = [[name, dob, phoneNumber]];
    return await db.makeQuery(sql, value);
}

module.exports = {
    register,
    change,
    remove
}