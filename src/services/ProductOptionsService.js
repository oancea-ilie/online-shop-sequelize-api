
export default class ProductOptionsService{
      
    constructor({ProductOptions},{sequelize}){
          this.productOptions = ProductOptions;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.productOptions.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Product Options in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.productOptions.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista Product Options cu acest id!");
        }
        return obj;

    }

    create= async(user)=>{
        if(user.option_id == null || user.product_id == null){
            throw new Error("Propietati invalide!");
        }
        if(!user.option_id){
            throw new Error('Campul option_id(fk) este gol!');
        }
        if(!user.product_id){
            throw new Error('Campul product_id(fk) este gol!');
        }
        else{
            await this.productOptions.create(user);
        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Product Options cu acest ID pentru a putea fi stears!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.option_id == ''&& obj.product_id == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.option_id){
                obj.option_id = user.option_id;
            }
            if(user.product_id){
                obj.product_id = user.product_id;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit Option cu acest ID pentru a putea face Update!");
        }
    }




}