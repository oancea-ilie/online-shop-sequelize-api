
export default class CustomerService{
      
    constructor({Customer},{sequelize}){
          this.customer = Customer;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.customer.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Customers in baza de date!(get)");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.customer.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista Customer cu acest id!");
        }
        return obj;

    }

    create= async(customer)=>{
        
        let all = await this.customer.findAll();

        if(customer.name == null || customer.email == null || customer.password == null || customer.billing_address == null || customer.phone == null){
            throw new Error("Propietati invalide!");
        }
        if(!customer.name){
            throw new Error('Campul Nume este gol!');
        }
        else if(!customer.email){
            throw new Error('Campul Email este gol!');
        }
        else if(!customer.password){
            throw new Error('Campul Password este gol!');
        }
        else if(!customer.billing_address){
            throw new Error('Campul Billing Address este gol!');
        }
        else if(!customer.phone){
            throw new Error('Campul Phone este gol!');
        }
        else{
            if(all){
                for(let c of all){
                    if(c.name == customer.name){
                        throw new Error("Acest nume exista deja in baza de date!");
                    }
                }
            }

            await this.customer.create(customer);

        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Customer cu acest ID pentru a putea fi stears!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);
        
        if(obj.name == '' && obj.email=='' && obj.password == '' && obj.billing_address == '' && obj.phone == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){
            
            if(user.name){
                obj.name = user.name;
            }
            if(user.email){
                obj.email = user.email;
            }
            if(user.password){
                obj.password = user.password;
            }
            if(user.billing_address){
                obj.billing_address = user.billing_address;
            }
            if(user.phone){
                obj.phone = user.phone;
            }

            await obj.save();

        }else{
            throw new Error("Nu s-a gasit Customer cu acest ID pentru a putea face Update!");
        }
    }




}