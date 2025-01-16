const express=require('express');
const router=express.Router();

const Person=require('./../models/Person.js');



router.post('/',async (req,res)=>{
try{
         const data=req.body;
    const newPerson=new Person(data);

    const response=await newPerson.save();
    console.log('Data Saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }

})


router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
    }catch(error){
        console.log('error while fetching');
        res.status(500).json({error:'Server error'});
    }

})

router.get('/:workType',async (req,res)=>{
      try{
        const workType=req.params.workType;
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const response=await Person.find({work:workType});
            console.log("Data fetched successfully");
            res.status(200).json(response);

        }else{
            console.log("Invalid Work Type");
            res.status(404).json("Work Type Not Found!!");
        }

      }catch(err){
        console.log("Invalid")
        res.status(500).json({err:'internal server error'});

      }
})


router.put('/:id', async (req,res)=>{
    try{

        const personId=req.params.id;
        const updatedPersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{new:true,runValidators:true});

        if(!response){
            return res.status(404).json({error:"Person Not Found!!"});
        }

        console.log("data Updated");
        res.status(200).json(response);


    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

router.delete('/:id', async (req,res)=>{
    try{
        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:"Person Not Found!!"});
        }

        
        console.log("data Deleted");
        res.status(200).json({message:"data deleted success"});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})




module.exports=router;