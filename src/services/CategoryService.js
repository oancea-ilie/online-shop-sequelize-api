
export default class CategoryService{
      
    constructor({Category},{sequelize}){
          this.category = Category;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.category.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Category in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.category.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista Category cu acest id!");
        }
        return obj;

    }

    create= async(user)=>{
        
        let all = await this.category.findAll();

        if(user.name == null || user.img == null || user.description == null){
            throw new Error("Propietati invalide!");
        }
        if(!user.name){
            throw new Error('Campul Nume este gol!');
        }
        else if(!user.img){
            throw new Error('Campul Image este gol!');
        }
        else if(!user.description){
            throw new Error('Campul Description este gol!');
        }
        else{
            if(all){
                for(let obj of all){
                    if(obj.name == user.name){
                        throw new Error("Acest nume exista deja in baza de date!");
                    }
                }
            }

            await this.category.create(user);

        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Category cu acest ID pentru a putea fi stears!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.name == '' && obj.img=='' && obj.description == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.name){
                obj.name = user.name;
            }
            if(user.img){
                obj.img = user.img;
            }
            if(user.description){
                obj.description = user.description;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit Category cu acest ID pentru a putea face Update!");
        }
    }




}