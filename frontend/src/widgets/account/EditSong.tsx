import React from 'react'
import styled from 'styled-components'
import { Button, Checkbox, ControlGroup, Divider, FormGroup, H4, InputGroup, TextArea } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import { ItemRendererProps, Select2 } from '@blueprintjs/select'

class EditSong extends React.Component {
    render() {

        return (
            <Container vertical={true}>
                <H4>Song Information</H4>
                <Divider />
                <FormGroup
                    label="Song Title"
                    labelFor='song-title-input'
                    labelInfo="(required)"
                >
                    <InputGroup id='song-title-input' placeholder='Song Title' maxLength={100} />
                </FormGroup>
                <FormGroup
                    label="Artist"
                    labelFor='artist-input'
                    labelInfo="(required)"
                >
                    <InputGroup id='artist-input' placeholder='Artist' maxLength={100} />
                </FormGroup>

                <FormGroup
                    label="Genre"
                    labelFor=''
                    labelInfo="(required)"
                >
                    <Select2 items={[]} itemRenderer={function (item: unknown, itemProps: ItemRendererProps<HTMLLIElement>): JSX.Element | null {
                        throw new Error('Function not implemented.')
                    }} onItemSelect={function (item: unknown, event?: React.SyntheticEvent<HTMLElement, Event> | undefined): void {
                        throw new Error('Function not implemented.')
                    }}>
                        <Button text="" rightIcon="double-caret-vertical" placeholder='Select a genre' />
                    </Select2>
                </FormGroup>
                <FormGroup
                    label="Description"
                    labelFor='description-input'
                >
                    <TextArea id='description-input' fill={true} maxLength={2000} placeholder='Description' growVertically={true} />
                </FormGroup>
                <FormGroup
                    helperText="Add an URL to a video showing you playing the song"
                    label="Preview URL"
                    labelFor='preview-url-input'
                    labelInfo="(optional)"
                >
                    <InputGroup id='preview-url-input' placeholder='Preview URL' maxLength={100} />
                </FormGroup>
                <ControlGroup vertical={false} fill={true}>
                    <FormGroup
                        helperText=""
                        label="Explicit"
                        labelFor='explicit-input'
                        labelInfo=""
                    >
                        <Checkbox id='explicit-input' />
                    </FormGroup>
                    <FormGroup
                        helperText=""
                        label="Challenge"
                        labelFor='challenge-input'
                        labelInfo=""
                    >
                        <Checkbox id='challenge-input' />
                    </FormGroup>
                    <FormGroup
                        helperText=""
                        label="Content Strike"
                        labelFor='contentStrike-input'
                        labelInfo=""
                    >
                        <Checkbox id='contentStrike-input' />
                    </FormGroup>
                </ControlGroup>
            </Container>
        )
    }
}

const Container = styled(ControlGroup)`
    margin-right: 20px;   
    margin-bottom: 20px;   
`

export default observer(EditSong)