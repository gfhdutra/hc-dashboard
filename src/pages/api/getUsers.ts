import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import CryptoJS from 'crypto-js'
import { UserData } from 'src/interfaces'


const notion = new Client({ auth: process.env.NOTION_API_KEY })
export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {

  function encrypt(word: any, key: any) {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString()
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    return encData
  }

  await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID || '' })
    .then(response => {
      const userList: UserData[] = []
      response.results.map((result: any) => {
        let id = result.id
        let user = result.properties.user.title[0].plain_text
        let email = result.properties.email.email
        let password = result.properties.password.rich_text[0].plain_text
        let active = result.properties.active.checkbox
        let clientDB = result.properties.clientDB.rich_text[0].plain_text
        userList.push({ id, user, email, password, active, clientDB })
      })
      let encryptext = encrypt(userList, process.env.DECRYPT_KEY)
      res.status(201).json({ encryptext })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Ops, algo deu errado!' })
    })
}
