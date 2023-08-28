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

import {path, pipe, propEq, tap, trim, when} from 'ramda';
import {useEffect, useState} from "react";

const newWord = () => {
  return fetch('https://random-word-api.herokuapp.com/word')
      .then(r => r.json())
      .then(r => r[0])
}

const defaultText = "Stare only at the red letter E and try not to stare at the word directly and type it in. If you'll type it correctly word will move farther. Hit Enter to start"

export default function Home() {

  const [score, setScore] = useState(0);
  const [userInput, setUserInputText] = useState('');
  const [word, setWord] = useState(defaultText);
  const [enterPressed, setEnterPressed] = useState(false);

  useEffect(() => {

      if(enterPressed && word !== defaultText) {

          if (word === trim(userInput)) {
              setScore(v => v + 1)
          } else {
              setScore(v => v - 1)
          }
      }

      if(enterPressed) {
          // newWord()
          randomName()
              .then(pipe(
                  tap(() => setEnterPressed(false)),
                  tap(() => setUserInputText('')),
                  setWord,
              ))
      }

  },[enterPressed])

  return (
    <main style={{marginTop: 100}}>
        <h1 style={{fontSize: 45, marginLeft: 415}}>SCOR<span style={{color: 'red'}}>E</span>: {score}</h1>

        <input type="text"
               style={{ textAlign: 'right', fontSize: 45}}
               value={userInput}
               onChange={pipe(path(['target','value']), setUserInputText)}
               onKeyUp={when(propEq('Enter', 'key'), () => setEnterPressed(true))}
        />
        <span style={{marginLeft: score*3, fontSize: 45}}>{word}</span>
    </main>
  )
}
