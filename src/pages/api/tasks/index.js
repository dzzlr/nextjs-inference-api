// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tasks } from "../../../../data/tasks"

export default function handler(req, res) {
  res.status(200).json(tasks)
}
