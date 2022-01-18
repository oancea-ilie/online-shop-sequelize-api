
export default class OptionService{
      
    constructor({Option},{sequelize}){
          this.option = Option;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.option.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Option in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.option.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista Option cu acest id!");
        }
        return obj;

    }

    create= async(user)=>{
        if(user.option_name == null){
            throw new Error("Propietati invalide!");
        }
        if(!user.option_name){
            throw new Error('Campul Nume este gol!');
        }
        else{
            await this.option.create(user);
        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Option cu acest ID pentru a putea fi stears!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.option_name == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.option_name){
                obj.option_name = user.option_name;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit Option cu acest ID pentru a putea face Update!");
        }
    }




}