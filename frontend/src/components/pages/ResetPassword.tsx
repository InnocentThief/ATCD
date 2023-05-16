import {
  Button,
  Card,
  ControlGroup,
  H2,
  H4,
  InputGroup,
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'

class ResetPassword extends React.Component {
  render() {
    return (
      <Container>
        <Form>
          <H4>Reset password</H4>
          <H2>
            <p />
          </H2>
          <ControlGroup fill={true} vertical={true}>
            <InputGroup leftIcon="envelope" placeholder="Email" />
            <H2>
              <p />
            </H2>
            <Button icon="reset" text="Reset password" intent="primary" />
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

export default observer(ResetPassword)
