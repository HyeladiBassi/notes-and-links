import Users from "..";

export const getUsers = async () => {
    return await Users.find();
}