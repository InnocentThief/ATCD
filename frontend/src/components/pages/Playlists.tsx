import React from 'react'
import styled from 'styled-components'
import Vertical from '../layouts/Vertical'
import { observer } from 'mobx-react'

class Playlists extends React.Component{
    render() {
        return(
            <Container>
                <>I'm the playlists page</>
            </Container>
        )
    }
}

const Container = styled(Vertical)`
    max-width: 1300px;
    display: grid;
    grid-template-columns: repeat(1,1fr);
    margin: 15px auto;
`

export default observer(Playlists)