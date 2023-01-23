import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updateedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true,
});

const UserModel = mongoose.model("User", userSchema);


userSchema.pre<UserDocument>('save', async function (next) {
    const user= this as UserDocument;

    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e: any) => false);
}

export default UserModel;
