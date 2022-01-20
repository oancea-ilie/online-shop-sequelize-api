
import  express from "express";

export default class OrderDetailsController{

     constructor(OrderDetailsService,app){

         this.orderDetailsService = OrderDetailsService;

         this.route = express.Router();

         app.use("/api/v1/order-details", this.route);

         this.getAll();
         this.getById();
         this.create();
         this.delete();
         this.update();

         this.catchErr();
     }


     getAll= async ()=>{

         this.route.get("/", async (req,res,next)=>{
             try{

                let obj = await this.orderDetailsService.getAll();

                res.status(200).json(obj);

             }catch(e){
                 next(e);
             }
             
         });

    }

    getById= async()=>{
        this.route.get("/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let obj = await this.orderDetailsService.getById(id);

                res.status(200).json(obj);

            }catch(e){
                next(e);
            }

         });
    }

    create = async()=>{
        this.route.post("/",async(req,res,next)=>{
            try{
                let body = req.body;

                await this.orderDetailsService.create(body);

                res.status(204).end();
            }catch(e){
                next(e);
            }
        })
    }

    delete = async()=>{
        this.route.delete("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let obj = await this.orderDetailsService.delete(id);

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    update = async()=>{
        this.route.put("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let user = req.body;
                
                await this.orderDetailsService.update(id,user);

                res.status(204).end();
                
            }catch(e){
                next(e);
            }
        });
    }

    catchErr=async()=>{
        this.route.use((err,req,res,next)=>{
            res.status(err.status || 500);
    
            res.json({
               error:{
                   message:err.message
               }
            });
         });
    }

}

