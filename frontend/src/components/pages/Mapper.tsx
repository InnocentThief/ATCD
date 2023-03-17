import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Context } from '../../contexts'

interface Props extends RouteComponentProps<{ authorKey: string }>{}

class Mapper extends React.Component<Props>{
    render() {
        const{

        } = Context

        return(
            <>I'm the mapper page</>
        )
    }
}

export default Mapper