import React from 'react'
import styled from 'styled-components'
import "isomorphic-fetch"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`

const UrlContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 15vw;
    background-color: #58bf52;
    justify-content: center;
    height: 40vh;
    width: 100vw;
`

const Title = styled.h1`
    color: #fff;
    font-size: 20px;
`

const Input = styled.input`
    font-size: 30px;
    color: #58bf52;
    height: 40px;
    width: 500px;
    padding: 2px;

    ::placeholder {
        opacity: 0.3;
        font-size: 20px;
    }
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Button = styled.button`
    margin-left: 10px;
    color: #399433;
    font-size: 14px;
    height: 50px;
    width: 100px;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 15vw;
    background-color: #e6f9f1;
    font-size: 20px;
    color: #FF9100;
    height: 60vh;

    a {
        color: #58bf52; 
    }
`

export default class extends React.Component {

    state = {
        originalUrl: '',
        shortenedUrl: '',
        resultMessage: ''
    }

    updateOriginalUrl = (event) => {
        this.setState({
            originalUrl: event.target.value
          });
    }

    handleClick = async () => {
        let response = await fetch(`/api/short/?originalUrl=${this.state.originalUrl}`);
        if (response.status !== 200) {
            this.setState({
                resultMessage: `Unable to create short URL: ${body.message}`
            })
        }
        let json = await response.json();
        this.setState({
            shortenedUrl: json.shortened_url,
            resultMessage: 'Here is yout shortened url:'
        });
    }
    
    render = () => {
        return (
            <Container>
                <UrlContainer>
                    <Title>Enter the original URL:</Title>
                    <Row>
                        <Input id='url' placeholder='Your original URL' type='text' onChange={this.updateOriginalUrl} />
                        <Button onClick={this.handleClick}>SHORTEN</Button>
                    </Row>
                </UrlContainer>
                <ResultContainer>
                    <p>
                        {this.state.resultMessage}
                    </p>
                    {this.state.shortenedUrl && <a href={this.state.shortenedUrl}>{this.state.shortenedUrl}</a>}
                </ResultContainer>
            </Container>
    
        )
    }
}