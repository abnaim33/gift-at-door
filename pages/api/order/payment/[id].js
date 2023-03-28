
import Orders from '../../../../models/orderModel'
import auth from '../../../../middleware/auth'
import connectToDB from '../../../../utils/connectToDb'

connectToDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await paymentOrder(req, res)
            break;
    }
}

const paymentOrder = async (req, res) => {
    try {
        const result = await auth(req, res)

        if (result.role === 'admin') {
            const { id } = req.query
            const { paymentId } = req.body

            await Orders.findOneAndUpdate({ _id: id }, {
                paid: true, dateOfPayment: new Date().toISOString(), paymentId,
                method: req.body.method
            })

            res.json({ msg: 'Payment success!' })
        }

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}