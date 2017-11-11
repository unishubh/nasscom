//var passport = require('passport');
var mongoose = require('mongoose');
// var device = mongoose.model('device');
// var device_user = mongoose.model('device_user');
// var dataStore = mongoose.model('dataSchemaDemo');
// var appliances = mongoose.model('applianceList');
var csv = require('fast-csv');
//var kue = require('kue-scheduler');
//var queue = kue.createQueue();
var util = require('util');
var obj = csv();

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.sendList = function(req,res){
   //console.log(req);
   var fr = req.params.fromYear;
   var t = req.params.toYear;
    var count =0;
    var data1 = {}
    var dataa={}
    var x =0;


   csv.fromPath("bjng.csv", {headers : true})
   .on("data", data => {
    //   data = JSON.parse(data);
    count++;
    if(count >=2)
    {
       // console.log(data['year']+" "+fr+" "+t);
       
        if(data['year']>=fr && data['year']<=t)
        {
           // console.log(data['year']);
            if(data['year'] in data1 && data['year'] in dataa)
            {
               // console.log(parseInt(data['pm2.5']));
               if(data['pm2.5'] == "NA")
               data['pm2.5'] = 0;
             x =  parseInt(dataa[data['year']]) + parseInt(data['pm2.5']) ;
             console.log(x+ " "+ parseInt(dataa[data['year']])+" "+ parseInt(data['pm2.5']));
               dataa[data['year']] =  x; 
               data1[data['year']]++;
            }
            else
            {
                data1[data['year']] =1;
                x =0;
                dataa[data['year']] = x; 
                console.log( dataa[data['year']]);
            }
        }
    
     
    }
   })
   .on("end", () => {
     console.log("Done");

     
     console.log(data1);

   
   res.status(200);
   //return data;
   res.json({"array":mapToJson(data1),
               "message":mapToJson(dataa)});

     
   });
};

function mapToJson(map) {
    return JSON.stringify([map]);
}

function myCSV(one,two)
{
    this.first =   one;
    this.second = two;
}

module.exports.city = function(req,res){
    var count=0;
    var tresh =2;
    console.log("Get");
    var dataArr = [];
    var temp = [12.8,14.8,19.4,26.7,31.1,33.0,30.5,28.8,28.5,24.9,19.0,14.1];
    var retar = [0,0,0,0,0,0,0,0,0,0,0,0];
    csv.fromPath("results.csv", {headers : true})
    .on("data", data => {
     //   data = JSON.parse(data);
     count++;
     if(count >=2)
     {
         //console.log(count);
        
        if(data[4]==req.params.city)
        {
            console.log(data[2]+" "+data[4]+" "+data[8]);

            var moth = parseInt(data[2].substring(3,5));
            console.log(moth);

            if(data[8]> tresh)
            {
                retar[moth-1] ++;
            }
            
        }

        //var month = data[2].substring(2,5);
      
     }
    })
    .on("end", () => {
      console.log(retar[0]);
    //  console.log(dataArr[0]);

    
    //   for(var i=0;i<dataArr.length;i++)
    //   {
        //   if(dataArr[i])
    //   }
    var tempar = JSON.stringify(temp);
    var  myJsonString = JSON.stringify(retar);
    res.status(200);
    res.json({"array":myJsonString,
                "temparr":tempar});

      
    });
    

};

module.exports.time = function(req,res){
    console.log(req.params.year);
    var year = req.params.year;
    var data1={}
    var dataa={}
    var count =0;
    var x =0;
    csv.fromPath("bjng.csv", {headers : true})
    .on("data", data => {
     //   data = JSON.parse(data);
     count++;
     if(count >=2)
     {
        // console.log(data['year']+" "+fr+" "+t);
        
         if(data['year']==year)
         {
           
            if(data['hour'] in data1 && data['hour'] in dataa)
            {
                if(data['pm2.5']=="NA")
                data['pm2.5']=0;

                data1[data['hour']]++;
                x =  parseInt(dataa[data['hour']]) + parseInt(data['pm2.5']) ;
                dataa[data['hour']] = x;
            }
           
            else
            {
                    data1[data['hour']] =1;
                    x =0;
                    dataa[data['hour']] = x; 
                    console.log( dataa[data['hour']]);
             }
            

             
            
         }
     
      
     }
    })
    .on("end", () => {
      console.log("Done");
 
      
      console.log(data1);
 
    
    res.status(200);
    //return data;
    res.json({"array":mapToJson(data1),
                "message":mapToJson(dataa)});
 
      
    });


};

module.exports.temperature = function(req,res){

        var f = req.params.from;
        var t = req.params.to;
        var year = req.params.year;
        var data1={}
        var dataa={}
        var a= [];
        var b= [];
        var count =0;
        var x =0;
        csv.fromPath("bjng.csv", {headers : true})
        .on("data", data => {
         //   data = JSON.parse(data);
         count++;
         if(count >=2 && count%10==0)
         {
            // console.log(data['year']+" "+fr+" "+t);
            if(data['pm2.5']!= "NA")
            {
            a.push(data['pm2.5'])
            b.push(data['TEMP']) 
            }
         
          
         }
        })
        .on("end", () => {
          console.log("Done");
     
          
          
     
        
        res.status(200);
        //return data;
        res.json({"array":JSON.stringify(a),
                   "temp":JSON.stringify(b) });
     
          
        });


};

module.exports.windspeed = function(req,res){

    var year = req.params.year;
    var data1={}
    var dataa={}
    var count =0;
    var x =0;
    csv.fromPath("bjng.csv", {headers : true})
    .on("data", data => {
     //   data = JSON.parse(data);
     count++;
     if(count >=2)
     {
        // console.log(data['year']+" "+fr+" "+t);
        
         if(data['year']==year)
         {
           
            if(data['Iws'] in data1 && data['Iws'] in dataa)
            {
                if(data['pm2.5']=="NA")
                data['pm2.5']=0;

                data1[data['Iws']]++;
                x =  parseInt(dataa[data['Iws']]) + parseInt(data['pm2.5']) ;
                dataa[data['Iws']] = x;
            }
           
            else
            {
                    data1[data['Iws']] =1;
                    x =0;
                    dataa[data['Iws']] = x; 
                    console.log( dataa[data['Iws']]);
             }
            

             
            
         }
     
      
     }
    })
    .on("end", () => {
      console.log("Done");
 
      
      console.log(data1);
 
    
    res.status(200);
    //return data;
    res.json({"array":mapToJson(data1),
                "message":mapToJson(dataa)});
 
      
    });

};

module.exports.script =  function(req,res){

    var path = req.params.path;
    var PythonShell = require('python-shell');
    // var options = {
    //     mode: 'text',
    //     pythonPath: 'path/to/python',
    //     pythonOptions: ['-u'],
    //     scriptPath: '../models/',
    //     args: ['path']
    //   };

      PythonShell.run('predict.py', function (err, results) {
        if(err)
        {

        }
        // results is an array consisting of messages collected during execution
        var fs = require("fs");
        var data = fs.readFileSync('../myOutput.txt');
      //  console.log("Synchronous read: " + data.toString());
        
       // console.log("Program Ended");
        //console.log(results);
        res.status(200); 
        res.json({"message":data.toString()});
      });
};