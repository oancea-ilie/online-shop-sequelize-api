
export default class ProductCategoryService{
      
    constructor({ProductCategory},{sequelize}){
          this.productCategory = ProductCategory;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.productCategory.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Product Category in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.productCategory.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista Product Category cu acest id!");
        }
        return obj;

    }

    create= async(user)=>{
        if(user.product_id == null || user.category_id == null){
            throw new Error("Propietati invalide!");
        }
        if(!user.product_id){
            throw new Error('Campul product_id(fk) este gol!');
        }
        if(!user.product_id){
            throw new Error('Campul category_id(fk) este gol!');
        }
        else{
            await this.productCategory.create(user);
        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Product Category cu acest ID pentru a putea fi stears!");
        }
    }
     
    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.product_id == '' && obj.category_id == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.product_id){
                obj.product_id = user.product_id;
            }
            if(user.category_id){
                obj.category_id = user.category_id;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit Option cu acest ID pentru a putea face Update!");
        }
    }




}