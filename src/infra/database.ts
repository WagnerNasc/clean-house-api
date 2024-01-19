import { Client } from 'pg'

class Database {
  private static instance: Database
  public client: Client
  constructor() {
    this.client = new Client({
      user: 'docker',
      database: 'clean-house',
      port: 5432,
      password: 'docker',
      host: 'localhost',
    })
  }
  public static getInstance(): Database {
    if(!Database.instance) {
      Database.instance = new Database() 
      Database.instance.client.connect()
    }

    return Database.instance
  }
}

export default Database.getInstance()