import axios from "axios";

const baseURL: string = "http://localhost:8000/todo";

export const fetchTaskListFromDB = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const addTaskToDB = async (title: string) => {
  try {
    const response = await axios.post(baseURL, {
      title: title.trim(),
      description: "",
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const updateTaskInDB = async (id: string, title: string) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, {
      title: title,
      description: "",
      completed: false,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTaskFromDB = async (id: string) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
