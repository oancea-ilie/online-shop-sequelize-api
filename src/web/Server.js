import express from "express";
import cors from "cors";
import Repository from "../config/Repository.js";
import CustomerService from "../services/CustomerService.js";
import CustomerController from "./Controllers/CustomerController.js";
import CategoryService from "../services/CategoryService.js";
import CategoryController from "./Controllers/CategoryController.js";
import OptionService from "../services/OptionService.js";
import OptionController from "./Controllers/OptionController.js";
import OrderDetailsService from "../services/OrderDetailsService.js";
import OrderDetailsController from "./Controllers/OrderDetailsController.js";
import OrderService from "../services/OrderService.js";
import OrderController from "./Controllers/OrderController.js";
import ProductCategoryService from "../services/ProductCategoryService.js";
import ProductCategoryController from "./Controllers/ProductCategoryController.js";
import ProductOptionsService from "../services/ProductOptionsService.js";
import ProductOptionsController from "./Controllers/ProductOptionsController.js";
import ProductService from "../services/ProductService.js";
import ProductController from "./Controllers/ProductController.js";

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

              let orderDetailsService = new OrderDetailsService(db.models,db.sequelize);
              let orderDetailsController = new OrderDetailsController(orderDetailsService, this.app);

              let orderService = new OrderService(db.models,db.sequelize);
              let orderController = new OrderController(orderService, this.app);

              let productCategoryService = new ProductCategoryService(db.models,db.sequelize);
              let productCategoryController = new ProductCategoryController(productCategoryService, this.app);

              let productOptionsService = new ProductOptionsService(db.models,db.sequelize);
              let productOptionsController = new ProductOptionsController(productOptionsService, this.app);

              let productService = new ProductService(db.models,db.sequelize);
              let productController = new ProductController(productService, this.app);

        });


      }
}