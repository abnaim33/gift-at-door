import connectToDB from "../../utils/connectToDb"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
connectToDB()
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
