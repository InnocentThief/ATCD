import { makeAutoObservable } from 'mobx'
import { AuthContext } from './auth'
import { parseString } from '../helpers/model'

export class SongAddContext {
  atsFilePath: string = ''
  songFilePath: String = ''
  coverFilePath: string = ''
  allFilePathsAvailable: boolean = false

  uploadFinishedMessage: string = ''
  uploadProgress: number = 0

  constructor(private auth: AuthContext) {
    makeAutoObservable(this)
  }

  updateAtsFilePath = (filePath: string) => {
    this.atsFilePath = filePath
    this.updateFilePathsAvailability()
  }

  updateSongFilePath = (filePath: string) => {
    this.songFilePath = filePath
    this.updateFilePathsAvailability()
  }

  updateCoverFilePath = (filePath: string) => {
    this.coverFilePath = filePath
    this.updateFilePathsAvailability()
  }

  upload = async () => {
    // const {
    //   account: { currentAccount },
    // } = Context
    // const atsFile = fs.readFileSync('/path-to-file', 'utf-8')
    // let atsFileToUpload = ""
    // formData.append('file', atsFileToUpload, '')
    // let songFileToUpload = ''
    // formData.append('file', songFileToUpload, '')
    // let coverFileToUpload = ''
    // formData.append('file', coverFileToUpload, '')
    // const response = await this.auth.fetch(
    //   `/api/accounts/${currentAccount?.accountKey}/uploadSongFiles`,
    //   {
    //     method: 'POST',
    //     body: formData,
    //   },
    //   false
    // )
    // this.handleUploadResponse(response)
    // try {
    // } catch (error) {}
  }

  private handleUploadResponse = async (response: Response) => {
    const redirectUrl = parseString(await response.text())
    console.log(redirectUrl)
  }

  private updateFilePathsAvailability = () => {
    console.log(this.atsFilePath)
    console.log(this.songFilePath)
    console.log(this.coverFilePath)
    this.allFilePathsAvailable =
      this.atsFilePath.length > 0 &&
      this.songFilePath.length > 0 &&
      this.coverFilePath.length > 0
  }
}
