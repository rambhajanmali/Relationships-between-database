
const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});


// customerSchema.pre("findOneAndDelete", async () =>{
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer) =>{
    if(customer.orders.length){
        let res = await Order.deleteMany({ _id: { $in: customer.orders} });
        console.log(res);
    }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () =>{
    // let cust1 = new Customer({
    //     name: "sateesh"
    // });

    // let order1 = await Order.findOne({item: "chips"});
    // let order2 = await Order.findOne({item: "chocolate"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let result = cust1.save();
    // console.log(result);

    let result = await Customer.find({});
    console.log(result);
};

addCustomer();

// const addOrders = async () =>{
//     const res = await Order.insertMany([
//         {item: "chips", price: 12},
//         {item: "samosa", price: 20},
//         {item: "chocolate", price: 40},
//      ]);
//      console.log(res);
// }

// addOrders();



// functions
const findCustomer = async () =>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};


const addCust = async () =>{
    let newCust = new Customer({
        name: "Karan Arjun",
    });

    let newOrder = new Order({
        item: "Burger",
        price: 98
    });

    newCust.orders.push(newOrder);

    await newCust.save();
    await newOrder.save();

    console.log("order was added to the database");
};


const deleteCust = async() =>{
    let data = await Customer.findByIdAndDelete("65f895e99b0633730f22a657");
    console.log(data);
}

// addCust();
deleteCust();

