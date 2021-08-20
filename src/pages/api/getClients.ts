import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { ClientData } from 'src/interfaces'


const notion = new Client({ auth: process.env.NOTION_API_KEY })
export default async function getClients(req: NextApiRequest, res: NextApiResponse) {
  const { databaseID } = req.body

  await notion.databases.query({ database_id: databaseID })
    .then(response => {
      const clientsList: ClientData[] = []
      response.results.map((result: any) => {
        let id = result.properties.id.title[0].plain_text
        let name = result.properties.name.rich_text[0].plain_text
        let cpf = result.properties.cpf.rich_text[0].plain_text
        let email = result.properties.email.rich_text[0].plain_text
        let phone = result.properties.phone.rich_text[0].plain_text
        let adress = result.properties.adress.rich_text[0].plain_text
        clientsList.push({ id, name, cpf, email, phone, adress })
      })
      res.status(201).json({ clientsList })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Ops, algo deu errado!' })
    })
}
