import React, { Component} from 'react';
import {Card, Paper, Typography, makeStyles } from '@material-ui/core';
import quizQuestions from '../questions/quizQuestions.js';
import Quiz from './Quiz';
import Result from './Result';
import '../QuizPage.css'



const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      marginTop: '-5vh',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column'
    },
    submitButton: {
    },
    cardStyle: {
      marginBottom: '30px',
      boxShadow: 'none'
    },
    offBlack: {
      color: '#333'
    },
    space: {
      letterSpacing: '2px',
      paddingBottom: '5px'
    }
  }));


class QuestionPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          counter: 0,
          questionId: 1,
          question: '',
          answerOptions: [],
          answer: '',
          answersCount: {},
          result: '',
          correctAnswers: 0
        };
    
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }
    
    componentDidMount() {
        const shuffledAnswerOptions = quizQuestions.map(question =>
          this.shuffleArray(question.answers)
        );
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0]
        });
    }
    
    shuffleArray(array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
    
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    
    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        
        if (this.state.questionId < quizQuestions.length) {
          setTimeout(() => this.setNextQuestion(), 300);
        } else {
          
            setTimeout(() => this.setResults(this.state.correctAnswers), 300);
          //setTimeout(() => this.setResults(0), 300);
        }
    }
    
    setUserAnswer(answer) {
        if (answer == 1) {
            this.setState({correctAnswers: this.state.correctAnswers +1}) 
        } 
        else {
            this.setState({correctAnswers: this.state.correctAnswers}) 
        }
    }
    
    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
    
        this.setState({
          counter: counter,
          questionId: questionId,
          question: quizQuestions[counter].question,
          answerOptions: quizQuestions[counter].answers,
          answer: ''
        });
    }
    
    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
    
        // return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
        return this.state.correctAnswers
      }
    
    setResults(result) {
        if (result == 0){
            this.setState({result: '0' })
        } else {
            this.setState({result: result})
        }
      }
    
    renderQuiz() {
        return (
          <Quiz
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
          />
        );
      }
    
    renderResult() {
        return <Result quizResult={this.state.result} />;
      }
    
    render() {
        return (
          <div className="App">
            <div className="App-header">
              
              <h2>Reading Quiz</h2>
            </div>
            {this.state.result ? this.renderResult() : this.renderQuiz()}
          </div>
        );
      }
    }
    
export default QuestionPage;  
    

