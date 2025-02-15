
const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');
}

const userSchema = new Schema({
   userName: String,
   email: String
});

const postSchema = new Schema({
    content: String,
    likes:Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () =>{
    let user = await User.findOne({username: "Rahul Kumar"});

    let post2= new Post({
        content: "bye bye",
        likes: 24,
    });

    post2.user = user;

    await post2.save();
  

};

addData();