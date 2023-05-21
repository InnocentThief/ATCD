import { observer } from 'mobx-react'
import React from 'react'
import Vertical from '../../components/layouts/Vertical'
import styled from 'styled-components'
import { Button, Callout, ControlGroup, Divider, FileInput, FormGroup, H4, Intent } from '@blueprintjs/core'
import { Context } from '../../contexts'
import { getExtension } from '../../helpers/fileExtensions'
import * as toaster from '../../helpers/toaster'

class AddSong extends React.Component {
    render() {
        const {
            songAdd: { atsFilePath, songFilePath, coverFilePath, allFilePathsAvailable, upload }
        } = Context

        return (
            <Container>
                <UploadContainer vertical={true}>
                    <H4>Upload Song</H4>
                    <Divider />
                    <Callout
                        title="File requirements"
                        intent={Intent.PRIMARY}
                    >
                        Please select the files below. All files are required.
                    </Callout>
                    <FormGroup
                        helperText="Choose your songs *.ats file"
                        label="ATS File"
                        labelFor="ats-file-input"
                        labelInfo="(required)"
                    >
                        <FileInput
                            id='ats-file-input'
                            text={atsFilePath}
                            fill={true}
                            buttonText='Browse'
                            onInputChange={this.handleAtsFileTextChange} />
                    </FormGroup>
                    <FormGroup
                        helperText="Choose your songs *.ogg file"
                        label="Song File"
                        labelFor='song-file-input'
                        labelInfo="(required)"
                    >
                        <FileInput
                            id='song-file-input'
                            text={songFilePath}
                            fill={true}
                            buttonText='Browse'
                            onInputChange={this.handleSongFileTextChange} />
                    </FormGroup>
                    <FormGroup
                        helperText="Choose a cover image (*.png) with a resolution between '500x500@96' and '1000x1000@96'"
                        label="Cover"
                        labelFor="cover-file-input"
                        labelInfo="(required)"
                    >
                        <FileInput
                            id='cover-file-input'
                            text={coverFilePath}
                            fill={true}
                            buttonText='Browse'
                            onInputChange={this.handleCoverFileTextChange} />
                    </FormGroup>
                    <Button text="Upload files" disabled={!allFilePathsAvailable} onClick={upload} intent={Intent.PRIMARY} />
                </UploadContainer>
                <ControlGroup vertical={true}>
                    <Callout title='Work In Progress Songs' intent={Intent.DANGER}>
                        <p>
                            Yout do NOT need to upload your song to test it in game.
                        </p>
                        <p>
                            Use the <a href="https://discord.gg/fUAxVRPP5W">#testplay-request</a> channel on
                            the ATCD Discord to have your song testet by other users.
                        </p>
                        <p>
                            WIP songs will be removed.
                        </p>
                    </Callout>
                    <Callout title="Terms of Service" intent={Intent.WARNING}>
                        By uploading your song, you acknowledge that you agree to our Terms of Service.
                    </Callout>
                </ControlGroup>
            </Container >
        )
    }

    private handleAtsFileTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            songAdd: { updateAtsFilePath }
        } = Context
        let fileName = e.target.value
        if (getExtension(fileName) === "ats") {
            updateAtsFilePath(fileName)
        } else {
            updateAtsFilePath("")
            toaster.error("Wrong file type selected. Please select an .ats file.")
        }
    };

    private handleSongFileTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            songAdd: { updateSongFilePath }
        } = Context
        let fileName = e.target.value
        if (getExtension(fileName) === "ogg") {
            updateSongFilePath(fileName)
        } else {
            updateSongFilePath("")
            toaster.error("Wrong file type selected. Please select an .ogg file.")
        }
    };

    private handleCoverFileTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            songAdd: { updateCoverFilePath }
        } = Context
        let fileName = e.target.value
        if (getExtension(fileName) === "png") {
            updateCoverFilePath(fileName)
        } else {
            updateCoverFilePath("")
            toaster.error("Wrong file type selected. Please select a .png file.")
        }
    };
}

const Container = styled(Vertical)`
  display: grid;
  grid-template-columns: 1fr 400px;
`

const UploadContainer = styled(ControlGroup)`
    margin-right: 20px;
`

export default observer(AddSong)