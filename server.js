// function add(a,b){
//  return a+b;
// }

// var result=add(1,6);
// console.log(result);

// (function(a,b){
//     console.log(a+b);
// })(1,2);


// var file=require('./newFile.js');
// var os=require('os');
// var fs=require('fs');

// var user=os.userInfo();

// console.log(user.username);

// fs.appendFile("newFile.txt","Yo "+user.username+"!\n", callback);

// console.log(file.addNum(1,2));

// function callback(){
//     console.log("i think it is working");
// }


// const objectToConvert= { name: "sourav", age: 24};

// const str=JSON.stringify(objectToConvert);
// console.log(str);
// console.log(str.length);

// const jsonToConvert='{"name":"sourav","age":24 }';

// const obj=JSON.parse(jsonToConvert);
// console.log(obj);
// console.log(obj.name);



const express=require('express');
const app=express();
const db=require('./db');


//body-parser is used as we don't know which kind of data is being passed so body-parser is the middleware which is used to read the data entered, it saves the data in the body
const bodyParser=require('body-parser');
app.use(bodyParser.json());
//const Person=require('./models/Person')
const Menu=require('./models/Menu')

// app.get('/',function(req,res){
//     res.send("Well! Hello there!!");
// })
// app.post('/person',async (req,res)=>{
//    /* newPerson.save((error,savedPerson)=>{
//         if(error){
//             console.log("Error in saving the data: ",error);
//             res.status(500).json({error:'Internal Server Error'})
//         }
//         else{
//             console.log("Data Saved Successfully");
//             res.status(200).json(savedPerson);
//         }
//     })
// */
// //not used anymore

// //now try catch block with async and await is used
// //async is used in the req,res function and await is used when all the tasks are completed
// try{
//          const data=req.body;
//     const newPerson=new Person(data);

//     const response=await newPerson.save();
//     console.log('Data Saved');
//     res.status(200).json(response);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'internal server error'});
//     }

// })


// app.get('/person',async(req,res)=>{
//     try{
//         const data=await Person.find();
//         console.log('Data fetched successfully');
//         res.status(200).json(data);
//     }catch(error){
//         console.log('error while fetching');
//         res.status(500).json({error:'Server error'});
//     }

// })

// app.get('/person/:workType',async (req,res)=>{
//       try{
//         const workType=req.params.workType;
//         if(workType=='chef'||workType=='waiter'||workType=='manager'){
//             const response=await Person.find({work:workType});
//             console.log("Data fetched successfully");
//             res.status(200).json(response);

//         }else{
//             console.log("Invalid Work Type");
//             res.status(404).json("Work Type Not Found!!");
//         }

//       }catch(err){
//         console.log("Invalid")
//         res.status(500).json({err:'internal server error'});

//       }
// })


const personRoutes=require('./routes/personRoutes');

app.use('/person',personRoutes);

// app.post('/menu',async (req,res)=>{
//     try{
//         const data=req.body;
//         const newMenu=new Menu(data);
//         const response=await newMenu.save();
//         console.log('data fetched successfully');
//         res.status(200).json(data);
//     }catch(error){
//         console.log('error while fetching');
//         res.status(500).json({error:'internal server error'});
//     }
// })

// app.get("/menu",async (req,res)=>{
//     try{
//         const data=await Menu.find();
//         console.log('Data fetched successfully');
//         res.status(200).json(data);
//     }
//     catch(error){
//         console.log("Error");
//         res.status(500).json({error:"internal server error"});
//     }
// })

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.listen(3000,()=>{console.log("App is running in port 3000")});