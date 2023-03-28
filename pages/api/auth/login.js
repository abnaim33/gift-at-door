import connectToDB from "../../../utils/connectToDb";
import bcrypt from 'bcrypt'
import Users from '../../../models/userModel'
import { createAccessToken, createRefreshToken } from "../../../utils/generateToken";
connectToDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;


    }
}


const login = async (req, res) => {
    try {
        const { email, pass } = req.body

        const user = await Users.findOne({ email })
        if (!user) return res.status(400).json({ err: 'This email does not exists.' })


        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) return res.status(400).json({ err: "Incorrect password" })

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })

        res.json({
            msg: "login success",
            refresh_token,
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}