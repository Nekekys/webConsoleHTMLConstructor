import React from 'react'
import './App.css';
import {useRef, useState, useEffect} from "react";

function App() {
  const [text,setText] = useState('')
  const [showResult,setShowResult] = useState(false)
  const [currentArray,setCurrentArray] = useState( [
      {
          teg: "div",
          class: "bc-red",
          id: 1,
          text: '',
          parent: 0,
          nesting: 1,
          children: [

              ]
      },
      {
          teg: "div",
          class: "m-2",
          id: 4,
          text: '',
          parent: 0,
          nesting: 1,
          children: [3]
      },
      {
          teg: "div",
          class: "color-green",
          id: 3,
          text: 'text',
          parent: 4,
          nesting: 2,
          children: []
      }
      ])
  const [current,setCurrent] = useState([])
  const [consoleArray,setConsoleArray] = useState([])

  const refInput = useRef(null)

    /*useEffect(()=>{
        if(showResult){

        }
    },[showResult])*/

    function arrayToString() {
      let endString = ''
        for(let i = 0;i < current.length;i++){
            for(let j = 0;j < currentArray.length;j++){
                if(current[i] == currentArray[j].id){
                    endString+= currentArray[j].teg + "." + currentArray[j].class + '/'
                }
            }
        }
        return endString+'>'
    }

    function findChildren(id){
        for(let i = 0;i < currentArray.length;i++){
            if(currentArray[i].id == id){
                return currentArray[i]
            }
        }
    }

  const pressEnter = (e) =>{
    if(e.code == "Enter"){

        let anotherWord = ''
        let word = ''
        let check = false
        for(let i = 0; i < text.length; i++) {
            if (check) {
                anotherWord += text[i]
            }
            if (text[i].charCodeAt(0) == 32) {
                check = true
            } else if (!check) {
                word += text[i]
            }
        }
        if(word.length > 0){
            switch (word) {
                case "cd":
                    if(anotherWord[0] == '.'){
                        let newSlice = anotherWord.split('/')
                        let check = false
                        for(let i = 0;i < newSlice.length - 1;i++){
                            if(newSlice[i] != '..'){
                                check = true
                            }
                        }
                        if (check){
                            setConsoleArray(e => [...consoleArray,arrayToString() + text,"не верный формат"])
                        }else{
                            if(current.length < newSlice.length - 1){
                                setConsoleArray(e => [...consoleArray,arrayToString() + text,"такая директория не существует"])
                            }else {
                                let temp = [...current];
                                temp.splice(temp.length - (newSlice.length - 1), newSlice.length - 1);
                                setCurrent(temp)
                                setConsoleArray(e => [...consoleArray,arrayToString() + text])
                            }
                        }
                        setText("")
                    }else{
                        let str2 = anotherWord.split('/')
                        let customNesting = current.length + 1
                        let customNestingArray = Array.from(current)

                        for(let i = 0; i < str2.length;i++){
                            let str3 = str2[i].split('.')

                            if(customNesting == 1){
                                for(let j = 0; j < currentArray.length; j++){
                                    if(currentArray[j].nesting == (customNesting + i)){
                                        if((currentArray[j].teg == str3[0])&&(currentArray[j].class == str3[1])){
                                            customNestingArray.push(currentArray[j].id)
                                            customNesting++
                                        }
                                    }
                                }
                            }else{
                                for(let j = 0; j < currentArray.length; j++){
                                    if(currentArray[j].id == customNestingArray[customNestingArray.length - 1]){
                                        let childrenArray = currentArray[j].children
                                        for(let g = 0; g < childrenArray.length;g++) {
                                            for (let k = 0; k < currentArray.length; k++) {
                                                if ((currentArray[k].teg == str3[0]) && (currentArray[k].class == str3[1]) && (childrenArray[g] == currentArray[k].id)) {

                                                    customNestingArray.push(currentArray[k].id)
                                                    customNesting++
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(str2.length == (customNesting - (current.length + 1))){
                            setCurrent(customNestingArray)
                            setConsoleArray(e => [...consoleArray,arrayToString() + text])
                        }else{
                            setConsoleArray(e => [...consoleArray,arrayToString() + text,"не верная директория"])
                        }
                        setText("")
                    }
                    break
                case "create":
                    let str = anotherWord.split('.')
                    let data = Date.now()
                    let newObject
                    let nesting
                    if((str[0].length > 0)&&(str[1].length > 0)&&((str[0] == "div")||(str[0] == "span")||(str[0] == "p")||(str[0] == "h1")||(str[0] == "ul")||(str[0] == "li")||(str[0] == "h2")||(str[0] == "h3")||(str[0] == "h4")||(str[0] == "h5")||(str[0] == "h6")||(str[0] == "a"))){
                        if(current.length > 0){
                            let test =  Array.from(currentArray)
                           for(let i = 0;i < test.length;i++){
                               if(current[current.length - 1] == test[i].id){
                                   nesting = test[i].nesting + 1
                                   test[i].children.push(data)
                               }
                           }
                            setCurrentArray(test)

                            newObject = {
                                teg: str[0],
                                class: str[1],
                                id: data,
                                text: '',
                                parent: current[current.length - 1],
                                nesting: nesting,
                                children: []
                            }
                            setCurrentArray([...currentArray,newObject])
                        }else{
                            newObject = {
                                teg: str[0],
                                class: str[1],
                                id: data,
                                text: '',
                                parent: 0,
                                nesting: 1,
                                children: []
                            }
                        }
                        setConsoleArray(e => [...consoleArray,arrayToString() + text])
                    }else{
                        setConsoleArray(e => [...consoleArray,arrayToString() + text])
                        setConsoleArray(e => [...consoleArray,"ошибка, неверный формат ввода"])
                    }
                    //setConsoleArray(e => [...consoleArray,arrayToString() + text])
                    setText("")
                    break
               /* case "delete":
                    setConsoleArray(e => [...consoleArray,text])
                    setText("")
                    break*/
                case "show":
                    let finaleArray = []
                    let obj = {}
                    for(let i = 0;i < currentArray.length;i++){
                        if(currentArray[i].id == current[current.length - 1]){
                            obj = currentArray[i]
                        }
                    }

                    function preOrder(node){
                        if (node.children){
                            finaleArray.push(".".repeat(node.nesting) + node.teg + '.' + node.class)
                            for(let i = 0; i < node.children.length;i++){
                                preOrder(findChildren(node.children[i]));
                            }
                        }
                    }
                    if(Object.keys(obj).length != 0){
                        preOrder(obj)
                        setConsoleArray(e => [...consoleArray,arrayToString() + text,...finaleArray])
                    }else{

                        obj = {
                            teg: "body",
                            class: "body",
                            id: 0,
                            nesting: 0,
                            children: []
                        }
                        for(let i = 0;i < currentArray.length;i++){
                            if(currentArray[i].nesting == 1){
                                obj.children.push(currentArray[i].id)
                            }
                        }
                        if(obj.children.length > 0){

                            preOrder(obj)
                            setConsoleArray(e => [...consoleArray,arrayToString() + text,...finaleArray])

                        }else{
                            setConsoleArray(e => [...consoleArray,arrayToString() + text,"сетка пустая"])
                        }
                    }

                   // console.log(finaleArray)


                    setText("")
                    break
                case "text":
                    let test =  Array.from(currentArray)
                    for(let i = 0;i < test.length;i++){
                        if(current[current.length - 1] == test[i].id){
                            test[i].text = anotherWord
                        }
                    }
                    setCurrentArray(test)
                    setConsoleArray(e => [...consoleArray,arrayToString() + text])
                    setText("")
                    break
                case "result":
                    setShowResult(true)
                    setConsoleArray(e => [...consoleArray,arrayToString() + text])
                    setText("")
                    break
                case "help":
                    let helpArr = [
                        "cd <тег>.<класс>  - переход в нужный html-объект-ребенок",
                        "cd ../ - переход назад",
                        "create <тег>.<класс>  - создает  html-объект вложенный в текущий объект",
                        "text <string> - добавляет объекту, текст",
                        "show - показывает дерево элементов с текущего",
                        "result  - показывае итоговый результат в html"
                    ]
                    setConsoleArray(e => [...consoleArray,arrayToString() + text])
                    setConsoleArray(e => [...consoleArray,arrayToString() + text,...helpArr])
                    setText("")
                    break
                default:
                    setConsoleArray(e => [...consoleArray,arrayToString() + text,"неизвестная команда"])
                    setText("")
                    break

            }
        }else{
            setConsoleArray(e => [...consoleArray,arrayToString() + text,"ошибка, неправильный формат ввода"])
            setText("")
        }
    }
   }
  const focusFun = () =>{
      refInput.current.focus()
  }

  function showResultTree(node) {
    if(!node){
        return;
    }
    let arr = []
    for(let i = 0; i < node.children.length;i++){
        arr.push(showResultTree(findChildren(node.children[i])))
    }
    return React.createElement(node.teg, {className: node.class},node.text, arr);
  }

  function buildResult() {
      let obj =  {
          teg: "body",
          class: "body",
          id: 0,
          nesting: 0,
          children: []
      }
      for(let i = 0;i < currentArray.length;i++){
          if(currentArray[i].nesting == 1){
              obj.children.push(currentArray[i].id)
          }
      }
      if(obj.children.length > 0){
          return showResultTree(obj)
      }else{
          return "пустая ветка"
      }
  }


  return (
      <>
      {!showResult ?
              <div className="App" onClick={focusFun}>
                  <div className="containerMain">
                      {consoleArray.map( (e,index) => {
                          return <div key={index} className="item">{e}</div>
                      })}
                  </div>
                  <div className="conInput">
                      <p>{arrayToString()}</p>
                      <input  onKeyPress={pressEnter} type="text" className="input" value={text} onChange={(e)=>setText(e.target.value)} autoFocus={true} ref={refInput}/>
                  </div>
              </div>
              :
              <div className={"result"}>{buildResult()}
              <div onClick={()=> setShowResult(false)} className="close">закрыть</div>
              </div>
      }
    </>
  );
}

export default App;
