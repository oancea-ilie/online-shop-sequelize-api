
export default class OrderDetailsService{
      
    constructor({OrderDetails},{sequelize}){
          this.orderDetails = OrderDetails;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.orderDetails.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista OrderDetails in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.orderDetails.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista OrderDetails cu acest id!");
        }
        return obj;

    }
    // REIMPLEMENTARE CU FOREGIN KEY
    create= async(user)=>{

        if(user.price == null || user.quantity == null || user.order_id == null || user.product_id == null){
            throw new Error("Propietati invalide!");
        }
        if(!user.price){
            throw new Error('Campul Price este gol!');
        }
        else if(!user.quantity){
            throw new Error('Campul Quantity este gol!');
        }
        else if(!user.order_id){
            throw new Error('Campul order_id(fk) este gol!');
        }
        else if(!user.product_id){
            throw new Error('Campul product_id(fk) este gol!');
        }
        else{
            await this.orderDetails.create(user);

        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit OrderDetails cu acest ID pentru a putea fi stears!");
        }
    }

     // REIMPLEMENTARE CU FOREGIN KEY
    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.price == '' && obj.quantity=='' && obj.order_id =='' && obj.product_id==''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.price){
                obj.price = user.price;
            }
            if(user.quantity){
                obj.quantity = user.quantity;
            }
            if(user.order_id){
                obj.order_id = user.order_id;
            }
            if(user.product_id){
                obj.product_id = user.product_id;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit OrderDetails cu acest ID pentru a putea face Update!");
        }
    }




}