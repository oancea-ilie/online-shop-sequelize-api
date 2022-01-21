
import fs from "fs"
import path from "path";

import { Sequelize } from "sequelize";
import Customer from "../model/customer.js";
import Category from "../model/category.js";
import Option from "../model/option.js";
import OrderDetails from "../model/orderDetails.js";
import Order from "../model/order.js";
import ProductCategory from "../model/productCategory.js";
import ProductOptions from "../model/productOptions.js";
import Product from "../model/product.js";

export default  class Repository {

        config =()=>  new Promise((resolve,reject)=>{
                fs.readFile(path.normalize("src\\config\\config.json"),'utf8',(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        const {development}=JSON.parse(data);
                        resolve(development);
                    }
                });
            });


        createDb= async()=>{
            try{
               let development = await this.config();
      
               let sequelize = new Sequelize(development.database, development.username, development.password, {
                  host: development.host,
                     dialect: development.dialect
                }

               );
  
              let db={
                models:{}
              }

              db.sequelize = sequelize;
              db.Sequelize = Sequelize;
              db.models.Customer = Customer(sequelize);
              db.models.Category = Category(sequelize);
              db.models.Option = Option(sequelize);
              db.models.OrderDetails = OrderDetails(sequelize);
              db.models.Order = Order(sequelize);
              db.models.ProductCategory = ProductCategory(sequelize);
              db.models.ProductOptions = ProductOptions(sequelize);
              db.models.Product = Product(sequelize);
              
              db.models.Customer.hasMany(db.models.Order,{
                  // onDelete: 'CASCADE',
                  as:'fk_customer_id',
                  foreignKey:{
                    fieldName:'customer_id',
                    allowNull:false
                  },
              });
              db.models.Order.belongsTo(db.models.Customer,{
                  as:'fk_customer_id',
                  foreignKey:{
                    fieldName:'customer_id',
                    allowNull:false
                  },
              });

              db.models.Order.hasMany(db.models.OrderDetails,{
                  // onDelete: 'CASCADE',
                  as:'fk_order_id',
                  foreignKey:{
                    fieldName:'order_id',
                    allowNull:false
                  },
              });
              db.models.OrderDetails.belongsTo(db.models.Order,{
                  as:'fk_order_id',
                  foreignKey:{
                    fieldName:'order_id',
                    allowNull:false
                  },
              });

              db.models.Product.hasMany(db.models.OrderDetails,{
                // onDelete: 'CASCADE',
                as:'fk_product_id',
                foreignKey:{
                  fieldName:'product_id',
                  allowNull:false
                },
              });
              db.models.OrderDetails.belongsTo(db.models.Product,{
                  as:'fk_product_id',
                  foreignKey:{
                    fieldName:'product_id',
                    allowNull:false
                  },
              });

              db.models.Category.hasMany(db.models.ProductCategory,{
                // onDelete: 'CASCADE',
                as:'fk_category_id',
                foreignKey:{
                  fieldName:'category_id',
                  allowNull:false
                },
              });
              db.models.ProductCategory.belongsTo(db.models.Category,{
                  as:'fk_category_id',
                  foreignKey:{
                    fieldName:'category_id',
                    allowNull:false
                  },
              });

              db.models.Product.hasMany(db.models.ProductCategory,{
                // onDelete: 'CASCADE',
                as:'fk_product_id_product_category',
                foreignKey:{
                  fieldName:'product_id',
                  allowNull:false
                },
              });
              db.models.ProductCategory.belongsTo(db.models.Product,{
                  as:'fk_product_id_product_category',
                  foreignKey:{
                    fieldName:'product_id',
                    allowNull:false
                  },
              });

              db.models.Option.hasMany(db.models.ProductOptions,{
                // onDelete: 'CASCADE',
                as:'fk_option_id',
                foreignKey:{
                  fieldName:'option_id',
                  allowNull:false
                },
              });
              db.models.ProductOptions.belongsTo(db.models.Option,{
                  as:'fk_option_id',
                  foreignKey:{
                    fieldName:'option_id',
                    allowNull:false
                  },
              });

              db.models.Product.hasMany(db.models.ProductOptions,{
                // onDelete: 'CASCADE',
                as:'fk_product_id_product_option',
                foreignKey:{
                  fieldName:'product_id',
                  allowNull:false
                },
              });
              db.models.ProductOptions.belongsTo(db.models.Product,{
                  as:'fk_product_id_product_option',
                  foreignKey:{
                    fieldName:'product_id',
                    allowNull:false
                  },
              });

              return db;
              
            }catch(e){
              throw new  Error(e);

      
            }
        }

};