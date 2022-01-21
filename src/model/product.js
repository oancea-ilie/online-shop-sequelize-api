import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Product extends Sequelize.Model{}


    Product.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Name can not be null!'
                },
                notEmpty:{
                    msg:'Name can not be empty!'
                },
            },
        },

        price:{
            type:Sequelize.INTEGER,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Price can not be null!'
                },
                notEmpty:{
                    msg:'Price can not be empty!'
                },
            },
        },

        description:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Description can not be null!'
                },
                notEmpty:{
                    msg:'Description can not be empty!'
                },
            },
        },

        image:{
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg:'Image Address can not be null!' 
                },
                notEmpty:{
                    msg:'Image Address can not be empty!'
                },
            },
        },

        stock:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Stock can not be null!'
                },
                notEmpty:{
                    msg:'Stock can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Product;
};