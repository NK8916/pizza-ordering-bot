const {Schema}=require('mongoose');
const mongooose=require('mongoose')

const orderSchema=new Schema({
    phone:{
        type:String
    },
    address:{
        type:String,
        default:''
    },
    pizza_topping:{
        type:String
    },
    pizza_size:{
        type:String
    },
    order_status:{
        type:String,
        default:'Not Ordered'
    }
})

mongooose.model('Order',orderSchema)

