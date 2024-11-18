const taskModel = require("../models/taskModel")
const {validationResult}=require("express-validator")

//Obtener todas las tareas
const getTasks =async (req,res,next)=>{
    try {
        const tasks =await taskModel.getTasks()
        res.json(tasks)
    } catch (error) {
        next(error)
    }
};

//Obtener tares po ID

const getTasksbyId = async(req,res, next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()})
    }
    try {
        const tasks =await taskModel.getTasksbyId(req.params.id)
        if(!tasks){
           return res.status(404).json({error:"Tarea no encontrada"});
        }
        res.json(tasks)       
    }catch (error) {
        next(error)

    }
};

// Crear una tarea
const createTask = async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()})
    }
    try {
        const newTask =await taskModel.createTask(req.body);
        res.status(201).json(newTask);       
    }catch (error) {
        next(error)

    }
}

// Actualizar la tarea
const updateTask = async(req,re,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()})
    }
    try {
        const updateTask = await taskModel.updateTask(req.params.id,req.body)
        if(!updateTask){
            return res.status(404).json({error: "Tarea no encontrada"})
        }
        res.json(updateTask);
    } catch (error) {
        next(error)
    }
}

// Eliminar Tarea

const deleteTask= async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()})
    }
    try {
        const deleteTask= await taskModel.deleteTask(req.params.id);
        if(!deleteTask){
            return res.status(404).json({error:"task not found"});   
        }
        res.json({message:"tarea eliminada", tarea_eliminada: deleteTask} );
    } catch (error) {
        next(error)
    }
};

module.exports={
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksbyId
}   