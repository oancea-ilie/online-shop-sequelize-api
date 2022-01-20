
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
              // ASSOCIATII!!! 

              // // o persoana poate aparea in mai multe inchirieri.
              // db.models.Persoana.hasMany(db.models.Inchirieri,{
              //     onDelete: 'CASCADE',
              //     as:'fk_persoana_id',
              //     foreignKey:{
              //       fieldName:'persoana_id',
              //       allowNull:false
              //     },
              // });

              // // o inchiriere poate avea o singura persoana, persoana_id
              // db.models.Inchirieri.belongsTo(db.models.Persoana,{
              //   as:'fk_persoana_id',
              //   foreignKey:{
              //     fieldName:'persoana_id',
              //     allowNull:false
              //   },
              // });

              // // o masina, poate aparea in mai multe inchirieri sub forma de 
              // //masina_id.
              // db.models.Masina.hasMany(db.models.Inchirieri,{
              //   onDelete: 'CASCADE',
              //   as:'fk_masina_id',
              //   foreignKey:{
              //     fieldName:'masina_id',
              //     allowNull:false
              //   },
              // });

              // // o inchiriere poate avea o singura masina ca si masina_id
              // db.models.Inchirieri.belongsTo(db.models.Masina,{
              //   as:'fk_masina_id',
              //   foreignKey:{
              //     fieldName:'masina_id',
              //     allowNull:false
              //   },
              // });

              return db;
              
            }catch(e){
              throw new  Error(e);

      
            }
        }

};