const express=require('express');
const router=express.Router();

const Menu=require('./../models/Menu.js');

router.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const newMenu=new Menu(data);
        const response=await newMenu.save();
        console.log('data entered successfully');
        res.status(200).json(data);
    }catch(error){
        console.log('error while fetching');
        res.status(500).json({error:'internal server error'});
    }
})

router.get("/",async (req,res)=>{
    try{
        const data=await Menu.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
    }
    catch(error){
        console.log("Error");
        res.status(500).json({error:"internal server error"});
    }
})

router.get("/:tastedAs",async (req,res)=>{
    try{
        const tastedAs=req.params.tastedAs;
        if(tastedAs=="Spicy"||tastedAs=="Sweet"||tastedAs=="Sour"){
            const data=await Menu.find({taste:tastedAs});
        console.log('Data fetched successfully');
        res.status(200).json(data);
        }
        else{
            console.log("Invalid");
            res.status(404).json("Not Found");
        } 
    }
    catch(error){
        console.log("Error");
        res.status(500).json({error:"internal server error"});
    }
})


module.exports=router;