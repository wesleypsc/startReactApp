import "./style.css"

function Card(props){
    return(
        <div className="card">
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
}

export default Card


/*
 * Outra forma de capturar as propriedades em um componente é DESESTRUTURANDO, como no exemplo abaixo
 *
 * function Card({name, time}){
 *   return(
 *       <div className="card">
 *           <strong>{name}</strong>
 *           <small>{time}</small>
 *       </div>
 *   )
 * 
 * Dessa forma, não é necessário utilizar o props.nomePropriedade.
 * Basta especificar (entre chaves), na declaração da função, os nomes das propriedades existentes
 * e abaixo, quando precisar, somente buscar pelo nome da propriedade diretamente
}
*/