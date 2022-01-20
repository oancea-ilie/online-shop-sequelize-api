import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class ProductOptions extends Sequelize.Model{}
    
    ProductOptions.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return ProductOptions;
}