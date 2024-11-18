const pg=require("../config/db")

//mostrar todas las tareas

const getTasks = async()=>{
    try {
        const res = await pg.query("SELECT * FROM tareas")
        return res.rows
    } catch (error) {
        throw error
    }
}

//mostrar todas las tareas por ID

const getTasksbyId = async(id)=>{
    try {
        const res = await pg.query("SELECT * FROM tareas WHERE id = $1",[id]);
        
        return res.rows[0]
    } catch (error) {
        throw error;
    }
}


//nueva tarea
const createTask = async (task) => {
    const { title, descripcion } = task;
    try {
        const res = await pg.query(
            "INSERT INTO tareas (title, descripcion) VALUES ($1, $2) RETURNING *",
            [title, descripcion]
        );
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};



//Actualizar Tarea

const updateTask = async (id, task) => {
    const { title, descripcion } = task;
    try {
        const res = await pg.query(
            "UPDATE tareas SET title = $1, descripcion = $2 WHERE id = $3 RETURNING *",
            [title, descripcion, id]
        );
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};


//Eliminar Tarea



const deleteTask = async (id) => {
    try {
        const res = await pg.query("DELETE FROM tareas WHERE id = $1 RETURNING *", [id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getTasks,getTasksbyId,createTask,updateTask,deleteTask
}