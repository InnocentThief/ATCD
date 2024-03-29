import {
  Button,
  Card,
  ControlGroup,
  Divider,
  H2,
  H4,
  InputGroup,
  Intent,
  Label,
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'

class Register extends React.Component {
  render() {
    return (
      <Container>
        <Form>
          <H4>Register</H4>
          <H2>
            <p />
          </H2>
          <ControlGroup fill={true} vertical={true}>
            <InputGroup leftIcon="person" placeholder="Username" />
            <InputGroup leftIcon="envelope" placeholder="Email" />
            <H2>
              <p />
            </H2>
            <InputGroup
              placeholder="Password"
              leftIcon="lock"
              type="password"
            />
            <InputGroup
              placeholder="Repeat Password"
              leftIcon="lock"
              type="password"
            />
            <H2>
              <p />
            </H2>
            <Button icon="user" text="Register" intent={Intent.PRIMARY} />
            <H2>
              <p />
            </H2>
            <Divider />
            <H2>
              <p />
            </H2>
            <Label>Text</Label>
          </ControlGroup>
        </Form>
      </Container>
    )
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

export default observer(Register)
