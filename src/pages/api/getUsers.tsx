import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

interface UserData {
  user: string,
  email: string,
  password: string
}

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID || '' })
    .then(response => {
      const userList: UserData[] = []
      response.results.map((result: any) => {
        let user = result.properties.user.title[0].plain_text
        let email = result.properties.email.email
        let password = result.properties.password.rich_text[0].plain_text
        userList.push({ user, email, password })
      })
      res.status(201).json({userList})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Ops, algo deu errado!' })
    })
}
