import React from 'react'
import styled from 'styled-components'
import "isomorphic-fetch"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #E0E0E0;
    height: 100vh;
`

const Title = styled.h1`
    color: #464440;
`

const Input = styled.input`
    font-size: 30px;
    color: #FF9100;
    height: 50px;
    width: 500px;

    ::placeholder {
        opacity: 0.3;
    }
`

const Button = styled.button`
    margin-top: 10px;
    color: #464440;
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    width: 100px;
`

const ResultContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E0E0E0;
    font-size: 30px;
    color: #FF9100;
`

export default class extends React.Component {

    state = {
        originalUrl: '',
        shortenedUrl: ''
    }

    updateOriginalUrl = (event) => {
        this.setState({
            originalUrl: event.target.value
          });
    }

    handleClick = (event) => {
        this.getShortenedUrl()
        .then(res => this.setState({ shortenedUrl: res.url }))
        .catch(err => console.log(err));
    }

    getShortenedUrl = async () => {
        let response = await fetch(`/api/short/${this.state.originalUrl}`);
        if (response.status !== 200) throw Error(body.message);
        return await response.json();
    }
    
    render = () => {
        return (
            <Container>
                <Title>Enter the URL to be shortened:</Title>
                <Input id='url' placeholder='my url' type='text' onChange={this.updateOriginalUrl} />
                <Button onClick={this.handleClick}>Send</Button>
                {this.state.shortenedUrl &&
                    <ResultContainer>
                        This is your shortened url: {this.state.shortenedUrl}
                    </ResultContainer>}
            </Container>
    
        )
    }
}