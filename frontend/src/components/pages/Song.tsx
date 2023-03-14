import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Context } from '../../contexts'

interface Props extends RouteComponentProps<{ songKey: string }>{}

class Song extends React.Component<Props>{
    render() {
        const{

        } = Context

        return(
            <>I'm the song page</>
        )
    }
}

export default Song