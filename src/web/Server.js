import express from "express";
import cors from "cors";
import Repository from "../config/Repository.js";

import CustomerService from "../services/CustomerService.js";
import CustomerController from "./Controllers/CustomerController.js";

import CategoryService from "../services/CategoryService.js";
import CategoryController from "./Controllers/CategoryController.js";

import OptionService from "../services/OptionService.js";
import OptionController from "./Controllers/OptionController.js";

export default  class Server{

    constructor( ){
        this.app=express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());

        this.repo = new Repository();

        this.app.get('/', (req, res) => {
            res.json({
                message: 'Welcome to the REST API project!',
            });
        });
        
      }

      run= async()=>{

        let db = await this.repo.createDb();

        db.sequelize.sync()
        .then( () => {
               this.app.listen(3000,async () => {
               console.log(`Express server is listening on port 3000`);
            });
        }).then(()=>{
              let customerService =  new CustomerService(db.models,db.sequelize);
              let customerController = new CustomerController(customerService,this.app);

              let categoryService =  new CategoryService(db.models,db.sequelize);
              let categoryController = new CategoryController(categoryService,this.app);

              let optionService =  new OptionService(db.models,db.sequelize);
              let optionController = new OptionController(optionService,this.app);
        });


      }
}