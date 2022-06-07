import {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  
  const [conteiners, setConteiners] = useState([])

  useEffect(()=>{
    function getConteiners(){
      fetch('http://localhost:9000/conteiner')
        .then(data => data.json())
        .then(data =>{
          setConteiners(data)
          console.log(data)
        })
        .catch(err => console.error(err))
    }
    getConteiners()
  },[])

  function deleteConteiners(id){
    fetch(`http://localhost:9000/conteiner/${id}`,{
      method : 'delete'
    })
    .then(()=> window.location.reload())
    .catch(()=> alert('Erro ao Deletar este container'))
  }

  function addConteiners(){
   axios.post(`http://localhost:9000/conteiner`,{
        cliente : document.getElementById('cliente').value,
        numConteiner : document.getElementById('numConteiner').value,
        tipo : parseInt(document.getElementById('tipo').value), 
        status : document.getElementById('status').value,
        categoria : document.getElementById('categoria').value
      })
    .then(()=> window.location.reload())
    .catch(()=> alert('Erro ao Adicionar este conteiner'))
  }
 
  return (
    <div>
      <header>
        <h1>Conteiner CRUD</h1>
      </header>
        <hr/>
          <div>
            <h1>ADICIONAR CONTEINER</h1>
              <span>CLIENTE</span>
              <input type="text" id="cliente"/>
              <br/><br/>
              <span>NUMERO DE CONTAINER</span>
              <input type="text" id="numConteiner"/>
              <br/><br/>
              <span>TIPO</span>
              <select id='tipo'>
                <option value="20">20</option>
                <option value="20">40</option>
              </select>
              <br/><br/>
              <span>STATUS</span>
              <input type="text" id="status"/>
              <br/><br/>
              <span>CATEGORIA</span>
              <input type="text" id="categoria"/>
              <br/><br/>
            <button onClick={()=>addConteiners()}>ADICIONAR</button>
          </div>
        <hr/>
        {conteiners.map(c => {
          return(
            <div key={c.id}>
             <h2>NUMERO : {c.numConteiner}</h2>
                <p>CLIENTE: {c.cliente}</p>
                <p>TIPO: {c.tipo}</p>
                <p>CATEGORIA: {c.categoria}</p>
                <p>STATUS: {c.status}</p>
                
                <button onClick={()=>deleteConteiners(c.id)}>DELETAR</button>
                <button>ATUALIZAR</button>
              <hr/>
            </div>
          )
        })}
    </div>
  );
}

export default App;
