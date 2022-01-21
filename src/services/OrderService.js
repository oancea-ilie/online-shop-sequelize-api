
export default class OrderService{
      
    constructor({Order},{sequelize}){
          this.order = Order;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.order.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Order in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.order.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista Order cu acest id!");
        }
        return obj;

    }
    // REIMPLEMENTARE CU FOREGIN KEY
    create= async(user)=>{

        if(user.ammount == null || user.order_address == null || user.order_date == null || user.customer_id == null){
            throw new Error("Propietati invalide!");
        }
        if(!user.ammount){
            throw new Error('Campul Ammount este gol!');
        }
        else if(!user.order_address){
            throw new Error('Campul Order Address este gol!');
        }
        else if(!user.order_date){
            throw new Error('Campul Order Date este gol!');
        }
        else if(!user.customer_id){
            throw new Error('Campul customer_id(fk) este gol!');
        }
        else{
            await this.order.create(user);

        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Order cu acest ID pentru a putea fi stears!");
        }
    }

     // REIMPLEMENTARE CU FOREGIN KEY
    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.ammount == '' && obj.order_address=='' && obj.order_date=='' && obj.customer_id==''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.ammount){
                obj.ammount = user.ammount;
            }
            if(user.order_address){
                obj.order_address = user.order_address;
            }
            if(user.order_date){
                obj.order_date = user.order_date;
            }
            if(user.customer_id){
                obj.customer_id = user.customer_id;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit Order cu acest ID pentru a putea face Update!");
        }
    }




}