
export default class ProductService{
      
    constructor({Product},{sequelize}){
          this.product = Product;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.product.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Product in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.product.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista Product cu acest id!");
        }
        return obj;

    }

    create= async(user)=>{
        
        let all = await this.product.findAll();

        if(user.name == null || user.price == null || user.description == null
            || user.image == null|| user.stock == null){
            throw new Error("Propietati invalide!");
        }
        if(!user.name){
            throw new Error('Campul Name este gol!');
        }
        else if(!user.price){
            throw new Error('Campul Price este gol!');
        }
        else if(!user.description){
            throw new Error('Campul Description este gol!');
        }
        else if(!user.image){
            throw new Error('Campul Image este gol!');
        }
        else if(!user.stock){
            throw new Error('Campul Stock este gol!');
        }
        else{
            if(all){
                for(let obj of all){
                    if(obj.name == user.name){
                        throw new Error("Acest produs exista deja in baza de date!");
                    }
                }
            }

            await this.product.create(user);

        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Product cu acest ID pentru a putea fi sters!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.name == '' && obj.price=='' && obj.description == ''
            && obj.image == '' && obj.stock == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.name){
                obj.name = user.name;
            }
            if(user.price){
                obj.price = user.price;
            }
            if(user.description){
                obj.description = user.description;
            }
            if(user.image){
                obj.image = user.image;
            }
            if(user.stock){
                obj.stock = user.stock;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit Produs cu acest ID pentru a putea face Update!");
        }
    }




}