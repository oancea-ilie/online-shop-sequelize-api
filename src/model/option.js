import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Option extends Sequelize.Model{}
    
    Option.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        option_name:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Option Name can not be null!'
                },
                notEmpty:{
                    msg:'Option Name can not be empty!'
                },
            },
        },
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Option;
}