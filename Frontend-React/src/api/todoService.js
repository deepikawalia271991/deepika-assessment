import { axiosClient } from "./client";

export const postTodo = async (description, isCompleted) => {
    const res = await axiosClient.post("todoitems", {
        "Guid Id": "1",
        "Description": description,
        "IsCompleted": isCompleted
    })

    return res
}
export const fetchTodo = async () => {
    const res = await axiosClient.get("todoitems")

    return res
}
export const markCompleted = async (item) => {
    const res = await axiosClient.put(`todoitems/${item.id}`, item)
    console.log(res);
    return res
}