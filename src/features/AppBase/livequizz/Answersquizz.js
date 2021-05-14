import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "./livequizz.module.css";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart } from 'react-minimal-pie-chart';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: 500,
  },
}));

function Answersquizz({livequi}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [nbanswers, setnbanswers] = useState("")
  const [startlist, setstartlist] = useState(true)
  const [firstmount, setfirstmount] = useState(true)
  const [nbcorr, setnbcorr] = useState(0)
  const [nbwrong, setnbwrong] = useState(0)
  var nbcor = 0;
  var nbfo = 0;
  

  const incrementcorr = () => {
    console.log(setnbcorr(nbcorr+1))
    console.log('yoyo')
  }
  const incrementwrong = () => {
    setnbwrong(nbwrong+1)
  }

  const coloranswer = (correct, answervalue) => {
    

    if (correct) {
      nbcor= nbcor+1
      console.log(nbcor)
    return (
      <p className={styles.greencol}>{answervalue}</p>
    );} 
    else{
      nbfo= nbfo+1
      console.log(nbfo)
    return  <p className={styles.redcol}>{answervalue}</p>}
  }; 

  

  const listAnswers = () => {
    
    if (startlist) {
      
    return livequi.answer.map(({ username, answervalue, correct }, index) => (
      <div className={styles.form} key={index}>
        <hr className={styles.hr}></hr>
        <p className={styles.por}>Username: </p><p>{username}</p>
        <p className={styles.por}>Answer: </p>{coloranswer(correct, answervalue)}
      </div>
    ));} 
    else
    return <div></div>
  }; 

  const nbAnswers = () => {
    if (startlist) {
    return  (
      <div>
      <div className={styles.porle}><h2>Answers: {livequi.answer.length}</h2></div>
      <div className={styles.piepie}>
          <div>
          <p className={styles.greencol}>Correct answers {nbcor}</p>
          <p className={styles.redcol}>Wrong answers {nbfo}</p>
          </div>
          
        <PieChart
        data={[
        { title: 'Correct answers', value: nbcor, color: 'rgb(33, 209, 107)' },
        { title: 'Wrong answers', value: nbfo, color: 'rgb(255, 65, 90)' },
        ]}
        viewBoxSize={[100, 100]}
        animationEasing="ease-out"
        style={{ height: '100px' }}
        /> 

        </div>   
      </div>
    );} 
    else
    return <h2>Answers: 0</h2>
  }; 


  
  useEffect(() => {
    if(firstmount){
      livequi.answer.map(({  correct }, index) => {
        console.log('yo')
        if (correct) {
          console.log(setnbcorr(nbcorr+1))} 
          else{
          incrementwrong()}
      })
    }
    setfirstmount(false)
    
  })
  
  return (
    <div style={modalStyle} className={classes.paper}>
      <form className={styles.form}>
        <h1 className={styles.p}>Question: {livequi.question}</h1>
           {
             livequi.answer.map(({  correct }, index) => {
              console.log('yo')
              if (correct) {
                nbcor= nbcor+1}
                else{
                  nbfo= nbfo+1}
            })
           }
        {nbAnswers()}
        {listAnswers()}
        
      </form>
    </div>
  );
}

export default Answersquizz;
