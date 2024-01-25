import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AWS from 'aws-sdk'

export default class UploadFilesController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const { extension, type, acl = 'public-read' } = request.body()

      const supportedTypes = ['images', 'audios', 'videos', 'files', 'html']
      if (!supportedTypes.includes(type)) {
        return response
          .status(401)
          .json({ message: 'Unsupported file type.', types: supportedTypes })
      }

      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        region: 'af-south-1',
        credentials: {
          accessKeyId: 'AKIAQFPVLYD3TFUDLO75',
          secretAccessKey: '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',
        },
      })

      const randomString = this.generateRandomString(10)
      const fileExtension = extension
      const bucketTo = 'upperz-files'

      const fileName = `${randomString}${
        Math.floor(Math.random() * 900000) + 100000
      }${Date.now()}${this.generateRandomString(7)}${
        Math.floor(Math.random() * 9000) + 1000
      }.${fileExtension}`

      const filePath = `${type}/original/${fileName}`
      const params = {
        Bucket: bucketTo,
        Key: filePath,
        ACL: acl,
      }

      const result = await s3.getSignedUrlPromise('putObject', params)
      return response.ok({
        status: true,
        data: {
          url: result,
          file_path: filePath,
        },
      })
    } catch (error) {
      return response.expectationFailed({
        status: false,
        message: 'Une erreur est survenu',
      })
    }
  }

  public generateRandomString(code_length = 32) {
    const alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    let code = ''

    for (let i = 0; i < code_length; i++) {
      code += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }

    return code
  }
}
