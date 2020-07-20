const mongoose=require('mongoose')
const Order=mongoose.model('Order')

async function register(agent){
    try{
        return Order.create({phone:agent.parameters.phone})
    }catch(err){
        throw new Error(err)
    }
   
}

async function saveAddress(agent){
    console.log(agent.req.body)
    const {phone}=agent.context.contexts.awaiting_phone.parameters
    try{
        return Order.findOneAndUpdate({phone},{address:agent.parameters.address},{new:true})
    }
    catch(err){
        throw new Error(err)
}
}

async function saveTopping(agent){
    const {phone}=agent.context.contexts.awaiting_phone.parameters
    try{
        return Order.findOneAndUpdate({phone},{pizza_topping:agent.parameters.topping},{new:true})
    }
    catch(err){
        throw new Error(err)
}
}

async function saveSize(agent){
    const {phone}=agent.context.contexts.awaiting_phone.parameters
    try{
        return Order.findOneAndUpdate({phone},{pizza_size:agent.parameters.size},{new:true})
    }
    catch(err){
        throw new Error(err)
}
}

async function finalizeOrder(agent){
    console.log("agent",agent)
    const {phone}=agent.context.contexts.awaiting_phone.parameters
    console.log(phone)
    try{
        if(agent.parameters.confirm==='Yes'){
            return Order.findOneAndUpdate({phone},{order_status:'Preparing'},{new:true})
        } 

      return Order.findOne({phone})
    }
    catch(err){
        throw new Error(err)
}
}

async function checkStatus(agent){
   const {phone}=agent.parameters
    try{
        return Order.findOne({phone})

    }catch(err){
        throw new Error(err)
    }
}

module.exports={register,saveAddress,saveTopping,saveSize,finalizeOrder,checkStatus}