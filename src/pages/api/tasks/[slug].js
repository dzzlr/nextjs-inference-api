import { NextRequest, NextResponse } from 'next'
import { tasks } from "../../../../data/tasks"

export default function handler(req, res) {
  const slug = req.query.slug;
  const task = tasks.find(task => task.slug == slug);

  return task
    ? res.status(200).json(task)
    : res.status(404).json({ message: `Task not found.` })
}