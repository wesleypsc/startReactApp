import React, { useState, useEffect } from 'react'
import "./style.css"

import Card from "../../components/Card"

function Home() {
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUSer] = useState({name: "", user:"", avatar: ""})

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    }



    setStudents(prevState => [...prevState, newStudent])
  }

  /* O Hook useEffect é declarado da forma abaixo. 
   * useEffect(() => {},[])
   * É declarado o useEffect, com uma arrowFunction () =>, o corpo do useEffect {} e um array de dependências []
   * Segundo o professor do curso, ele prefere declarar o useEffect próximo ao return(), para efeito de praticidade.
   * 
   * Por padrão é executado sempre que a interface é renderizada.
   * 
   * O que eu colocar dentro do array de dependências, fará com que o useEffect seja executado, 
   * sempre que este "item alvo" seja atualizado! Se deixar o array vazio, será executado somente na renderização inicial.
   * 
   */

  /*useEffect(() => {
    fetch("https://api.github.com/users/wesleypsc")
      .then(response => response.json())
      .then(data => {
        setUSer({
          name: data.name,
          user: data.login,
          avatar: data.avatar_url
        })
        console.log(data)
      })
  },[])*/


  /* 
   * IMPORTANTE!!!
   * O useEffect não pode ser utilizado diretamente de forma assíncrona, declarando ele mesmo como async. 
   * Sendo assim, é necessário criar uma função assíncrona (pode ser fora dele) e executar esta função dentro dele.
   * Por isso o exemplo abaixo::: 
  */

  useEffect(() => {
    //Utilizando o async function, eu crio uma função assíncrona, que deixa o sistema livre para continuar o seu processamento.
    async function fetchData(){

      //Com a função assíncrona, utilizo o response = await para criar uma promessa ("promisse") de que será retornada alguma informação
      const response = await fetch("https://api.github.com/users/wesleypsc")
      const data = await response.json()
      console.log(data)

      setUSer({
        name: data.name, 
        user: data.login, 
        avatar: data.avatar_url
      })
    }

    fetchData()
    console.log(`
      Isso aqui está escrito depois da execução da função, mas por ser uma função assíncrona, esta mensagem deve ser exibida antes do retorno dos dados da API, mesmo que seja uma resposta rápida/instantânea!
    `)
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        
        <div>
          <span>
            <strong>{user.name}</strong> <br />
            {user.user}
          </span>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      {/* <p>Nome: {studentName}</p> */}
      <input 
        type="text" 
        placeholder="Digite seu nome" 
        onBlur={(e) => setStudentName(e.target.value)}
      />
      <button type="button"
        onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card 
            key   = {student.time} 
            name  = {student.name} 
            time  = {student.time} />
        ))      
      }
    </div>
  )
}

export default Home
