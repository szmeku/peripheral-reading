'use client'

const names =[
    'Maria',
'    Krystyna',
'    Anna',
'    Barbara',
'    Teresa',
'    Elżbieta',
'    Janina',
'    Zofia',
'    Jadwiga',
'    Danuta',
'    Halina',
'    Irena',
'    Ewa',
'    Małgorzata',
'    Helena',
'    Grażyna',
'    Bożena',
'    Stanisława',
'    Jolanta',
'    Marianna',
'    Urszula',
'    Wanda',
'    Alicja',
'    Dorota',
'    Agnieszka',
'    Beata',
'    Katarzyna',
'    Joanna',
'    Wiesława',
'    Renata',
'    Iwona',
'    Genowefa',
'    Kazimiera',
'    Stefania',
'    Hanna',
'    Lucyna',
'    Józefa',
'    Alina',
'    Mirosława',
'    Aleksandra',
'    Władysława',
'    Henryka',
'    Czesława',
'    Lidia',
'    Regina',
'    Monika',
'    Magdalena',
'    Bogumiła',
'    Marta',
'    Marzena',
'    Leokadia',
'    Mariola',
'    Bronisława',
'    Aniela',
'    Bogusława',
'    Eugenia',
'    Izabela',
'    Cecylia',
'    Emilia',
'    Łucja',
'    Gabriela',
'    Sabina',
'    Zdzisława',
'    Agata',
'    Edyta',
'    Aneta',
'    Daniela',
'    Wioletta',
'    Sylwia',
'    Weronika',
'    Antonina',
'    Justyna',
'    Gertruda',
'    Mieczysława',
'    Franciszka',
'    Rozalia',
'    Zuzanna',
'    Natalia',
'    Celina',
'    Ilona',
'    Alfreda',
'    Wiktoria',
'    Olga',
'    Wacława',
'    Róża',
'    Karolina',
'    Bernadeta',
'    Julia',
'    Michalina',
'    Adela',
'    Ludwika',
'    Honorata',
'    Aldona',
'    Eleonora',
'    Violetta',
'    Felicja',
'    Walentyna',
'    Pelagia',
'    Apolonia',
'    Brygida',
'    Zenona',
'    Izabella',
'    Romana'
]

const randomName = () => {
    return Promise.resolve(trim(names[Math.floor((Math.random() * names.length))]).toLowerCase())
}

import {head, juxt, last, path, pipe, propEq, tap, trim, when} from 'ramda';
import {useEffect, useState} from "react";

const newWord = () => {
  return fetch('https://random-word-api.herokuapp.com/word')
      .then(r => r.json())
      .then(r => r[0])
}

const defaultText = "Stare only at the red letter O and try not to stare at the word directly and type it in. If you'll type it correctly word will move farther. Hit Enter to start"

export default function Home() {

  const [score, setScore] = useState(0);
  const [userInput, setUserInputText] = useState('');
  const [wordLeft, setWordLeft] = useState(defaultText);
  const [wordRight, setWordRight] = useState(defaultText);
  const [enterPressed, setEnterPressed] = useState(false);

  useEffect(() => {

      if(enterPressed && wordRight !== defaultText) {

          if ((wordLeft + ' ' +  wordRight) === trim(userInput)) {
              setScore(v => v + 1)
          } else {
              setScore(v => v - 1)
          }
      }

      if(enterPressed) {
          // newWord()
          Promise.all([randomName(), randomName() ])
              .then(pipe(
                  tap(() => setEnterPressed(false)),
                  tap(() => setUserInputText('')),
                  juxt([
                      pipe(head, setWordLeft),
                      pipe(last, setWordRight)
                  ])
              ))
      }

  },[enterPressed])

  return (

    <main style={{marginTop: 100, textAlign: "center"}}>

        <h1 style={{fontSize: 45}}>SC<span style={{color: 'red'}}>O</span>RE</h1>
        <h1 style={{fontSize: 45}}>{score}</h1>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
            <span style={{textAlign: "right", flexBasis: "48%", paddingRight: score*3, fontSize: 45}}>{wordLeft}</span>

            <span style={{ flexBasis: "4%", textAlign: 'center'}}>
                     <input type="text"
                            style={{textAlign: 'center', fontSize: 45, width: "100%"}}
                            value={userInput}
                            onChange={pipe(path(['target','value']), setUserInputText)}
                            onKeyUp={when(propEq('Enter', 'key'), () => setEnterPressed(true))}
                     />
            </span>


            <span style={{textAlign: "left", flexBasis: "48%", paddingLeft: score*3, fontSize: 45}}>{wordRight}</span>
        </div>

    </main>
  )
}
