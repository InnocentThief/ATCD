import React from 'react'
import { Context } from '../../contexts'
import styled from 'styled-components'
import Vertical from '../layouts/Vertical'

class Playlists extends React.Component{
    render() {
        const{

        } = Context

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
    margin: 0 auto;
`

export default Playlists