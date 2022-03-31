
import './App.css';
import './components/style.css'
import Questions from './components/Questions'
import { useEffect } from 'react';
const Toggle = ({ question }) => {

  return (
    <>
      <h1 className='question-text'>{question.question}</h1>
      <div className='container'>
        <span className='toggle'></span>
        {
          question[0].answers.map((obj) =>
            (<span>{obj.answer}</span>)
          )
        }


      </div>
    </>
  )
}
function App() {

  const random = Math.floor(Math.random() * 2)
  useEffect(() => {
    //array for randomized toggle position
    const pos = ['pos', 'pos1'];
    const option = document.getElementsByClassName('option');
    const toggler = document.querySelectorAll('.selector')
    const body = document.querySelector('.App')
    var status = document.querySelector('.status')
    var tracker;
    var numCorrect = 0;
    Array.from(toggler).forEach((e) => {
      let random = Math.floor(Math.random() * 2)
      let position = pos[random]
      e.classList.add(position)
    })
    //initial checking of answers from loading screen
    Array.from(option).forEach((op, i) => {
      switch (i) {
        case 0:
          tracker = 0;
          break;
        case 1:
          tracker = 0;
          break;
        case 2:
          tracker = 1
          break;
        case 3:
          tracker = 1;
          break;
        case 4:
          tracker = 2;
          break;
        case 5:
          tracker = 2;
          break;
        case 6:
          tracker = 3;
          break;
        case 7:
          tracker = 3;
          break;
        case 8:
          tracker = 4;
          break;
        case 9:
          tracker = 4;
          break;
      }
      //validation for whether the correct answer is selected
      if (op.classList.contains('left') && op.classList.contains('correct') && toggler[tracker].classList.contains('pos')) {
        numCorrect++;
        console.log(op)
        console.log(numCorrect, 'correct')
      }
      else if (op.classList.contains('right') && toggler[tracker].classList.contains('pos1') && op.classList.contains('correct')) {
        numCorrect++;
        console.log(numCorrect, 'correct')
      }
    })
    //function for setting background color according to the answer
    function validate() {
      if (numCorrect != toggler.length)
        status.innerHTML = 'Incorrect'

      if (numCorrect == toggler.length) {
        status.innerHTML = 'Correct'
        body.classList.remove('one')
        body.classList.remove('two')
        body.classList.remove('three')
        body.classList.remove('allincorrect')
        body.classList.add('allcorrect')
      }
      else if (numCorrect == 0) {
        body.classList.add('allincorrect')
        body.classList.remove('one')
      }
      else if (numCorrect == 1) {
        body.classList.remove('allincorrect')
        body.classList.add('one')
        body.classList.remove('two')
      }
      else if (numCorrect == 2) {
        body.classList.remove('three')
        body.classList.remove('one')
        body.classList.add('two')
      }
      else if (numCorrect == 3) {
        body.classList.remove('two')
        body.classList.add('three')
      }
    }
    validate()
    console.log(numCorrect, 'current score')
    if (numCorrect != toggler.length) {
      var p = 0;

      Array.from(option).forEach((e, i) => {
        e.addEventListener('click', () => {
          switch (i) {
            case 0:
              p = 0;
              break;
            case 1:
              p = 0;
              break;
            case 2:
              p = 1
              break;
            case 3:
              p = 1;
              break;
            case 4:
              p = 2;
              break;
            case 5:
              p = 2;
              break;
            case 6:
              p = 3;
              break;
            case 7:
              p = 3;
              break;
            case 8:
              p = 4;
              break;
            case 9:
              p = 4;
              break;
          }
          if (numCorrect != toggler.length) {
            if (e.classList.contains('left') && toggler[p].classList.contains('pos1')) {
              toggler[p].classList.remove('pos1')
              toggler[p].classList.add('pos')
              if (e.classList.contains('left') && e.classList.contains('correct') && toggler[p].classList.contains('pos')) {
                numCorrect++;
                console.log('right correct', numCorrect)
              }
              else
                numCorrect--;
              console.log('left incorrect', numCorrect)
              validate()
            }
            if (e.classList.contains('right') && toggler[p].classList.contains('pos')) {
              toggler[p].classList.remove('pos')
              toggler[p].classList.add('pos1')
              if (e.classList.contains('right') && e.classList.contains('correct') && toggler[p].classList.contains('pos1'))
                numCorrect++;
              else if (e.classList.contains('right') && e.classList.contains('incorrect') && toggler[p].classList.contains('pos1'))
                numCorrect--;
              validate()
            }
          }
        })

      })





    }
  }, [])


  const list = Questions.map((obj, i) => {
    if (i == random) {
      return (<>
        <h1 className='question-header'>{obj.question}</h1>

        {
          obj.answers.map((x) =>
            <>
              <div className='toggleContainer'>
                <span className='selector'></span>
                <span className={x[0].isCorrect ? 'correct option left' : 'incorrect option left'}>
                  {x[0].answer}
                </span>
                <span className={x[1].isCorrect ? 'correct option right' : 'incorrect option right'}>
                  {x[1].answer}
                </span>
              </div>
            </>)
        }


      </>
      )
    }
  })
  return (
    <div className="App">
      {list}
      <h2 className='status'></h2>
    </div>
  );
}

export default App;
