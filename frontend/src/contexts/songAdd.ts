import { makeAutoObservable } from 'mobx'
import { AuthContext } from './auth'
import { parseString } from '../helpers/model'
import { Context } from '.'

export class SongAddContext {
  atsFile: File | null = null
  songFile: File | null = null
  coverFile: File | null = null

  atsFileName: string = ''
  songFileName: string = ''
  coverFileName: string = ''
  allFilePathsAvailable: boolean = false

  uploadFinishedMessage: string = ''
  uploadProgress: number = 0

  constructor(private auth: AuthContext) {
    makeAutoObservable(this)
  }

  updateAtsFile = (file: File | null) => {
    this.atsFile = file
    if (this.atsFile) {
      this.atsFileName = this.atsFile.name
    } else {
      this.atsFileName = ''
    }
    this.updateFilePathsAvailability()
  }

  updateSongFile = (file: File | null) => {
    this.songFile = file
    if (this.songFile) {
      this.songFileName = this.songFile.name
    } else {
      this.songFileName = ''
    }
    this.updateFilePathsAvailability()
  }

  updateCoverFile = (file: File | null) => {
    this.coverFile = file
    if (this.coverFile) {
      this.coverFileName = this.coverFile.name
    } else {
      this.coverFileName = ''
    }
    this.updateFilePathsAvailability()
  }

  upload = async () => {
    const {
      account: { currentAccount },
    } = Context

    const formData = new FormData()

    if (this.atsFile) {
      formData.append('file', this.atsFile, this.atsFile.name)
    }
    if (this.songFile) {
      formData.append('file', this.songFile, this.songFile.name)
    }
    if (this.coverFile) {
      formData.append('file', this.coverFile, this.coverFile.name)
    }

    const response = await this.auth.fetch(
      `/api/accounts/${currentAccount?.accountKey}/uploadSongFiles`,
      {
        method: 'POST',
        body: formData,
      },
      false
    )
    this.handleUploadResponse(response)
    try {
    } catch (error) {}
  }

  private handleUploadResponse = async (response: Response) => {
    const redirectUrl = parseString(await response.text())
    console.log(redirectUrl)
  }

  private updateFilePathsAvailability = () => {
    this.allFilePathsAvailable =
      this.atsFileName.length > 0 &&
      this.songFileName.length > 0 &&
      this.coverFileName.length > 0
  }
}
