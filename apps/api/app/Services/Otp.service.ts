import Otp from 'App/Models/Otp'

export class OtpService {
  public async get(input: Partial<Otp>): Promise<Otp> {
    await Otp.query().where('type', input.type!).where('email', input.email!).delete()

    return await this.save(input)
  }

  public async verify(input: Pick<Otp, 'type' | 'value' | 'email'>): Promise<Otp | null> {
    return await Otp.query()
      .where('value', input.value)
      .where('type', input.type)
      .where('email', input.email)
      .first()
  }

  public async save(input: Partial<Otp>): Promise<Otp> {
    return await Otp.create(input)
  }
}
