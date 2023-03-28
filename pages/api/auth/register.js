import connectToDB from "../../../utils/connectToDb";
import valid from "../../../utils/valid";
import bcrypt from 'bcrypt'
import Users from '../../../models/userModel'
connectToDB()
import { createAccessToken, createRefreshToken } from "../../../utils/generateToken";
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;


    }
}


const register = async (req, res) => {
    try {
        const { name, email, pass, confirm_pass } = req.body
        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ err: 'This email already exists.' })
        const errMsg = valid(name, email, pass, confirm_pass)

        if (errMsg) return res.status(400).json({ err: errMsg })

        const passwordHash = await bcrypt.hash(pass, 12)

        const newUser = await new Users({ name, email, password: passwordHash })
        const registerUser = await newUser.save()

        const access_token = createAccessToken({ id: registerUser._id })
        const refresh_token = createRefreshToken({ id: registerUser._id })

        res.json({
            msg: "Register success",
            refresh_token,
            access_token,
            user: {
                name: registerUser.name,
                email: registerUser.email,
                role: registerUser.role,
                avatar: registerUser.avatar,
                root: registerUser.root
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}