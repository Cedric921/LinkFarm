import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { ETypeUser } from 'App/Utils/Enums'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    try {
      await User.create({
        countryCode: '243',
        password: 'admin123',
        name: 'Super Admin',
        type: ETypeUser.SUPER_ADMIN,
        email: 'sudo@link.com',
        number: '970000001',
        lastName: 'admin',
      })
      console.log({
        status: true,
        message: 'user created',
      })
    } catch (error) {
      console.log({ error })
    }
  }
}
