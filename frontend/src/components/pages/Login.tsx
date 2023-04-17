import { Button, Card, ControlGroup, Divider, FormGroup, H2, H3, H4, H5, InputGroup, Label } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'

class Login extends React.Component{

    render() {
        return(
            <Container>
                
                <Form>
                    <H4>Sign in</H4>
                    <H2><p/></H2>
                    <ControlGroup fill={true} vertical={true}>
                        <InputGroup leftIcon="person" placeholder='Username' />
                        <InputGroup leftIcon="lock" placeholder='Password' />
                        <H2><p/></H2>
                        <Button icon="log-in" text="Sign in" intent='primary' />
                        <H2><p/></H2>
                        <a href={`restpassword`}>Forgot password?</a>
                        <H2><p/></H2>
                        <Divider />
                        <H2><p/></H2>
                        <Button icon="user" text="Sign up new account" onClick={this.register} />
                    </ControlGroup>
                </Form>
            </Container>
        )
    }

    register = () => {
        window.location.href = '/register'
    }
}

const Container = styled.div`
    max-width: 400px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 50px auto;
`

const Form = styled(Card)`
    display: grid;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    padding: 32px;
`

export default observer(Login)