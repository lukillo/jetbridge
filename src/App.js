import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';

function App() {
  const [people, setPeople] = useState([]);

  const handleChange = async (event)=>{
    if (event.target.value.length >= 1){
      Axios({
        url: `https://swapi.dev/api/people/?search=${event.target.value}`,
      })
        .then((response) => {
          if (response.status != 200) throw new Error('swapi call error');
          if(response.data.results.length > 0) {
            console.log('foo', response.data.results);
            setPeople(response.data.results);
          }  
          
        })
        .catch((error) => {
          console.log(error);
      });
    }
  }


  return (
    <div className="flex flex-col">
      <div class="input-group mb-4">
        <div class="input-group-prepend">
          <div class="input-group mb-4" style={{width: '120%'}}>
            <input type="text" class="form-control" 
            placeholder="Type an StarWars character" 
            aria-label="Type an StarWars character" 
            aria-describedby="basic-addon2" onChange={handleChange}>
            </input>
          </div>
        </div>  
      </div>
      <table class="table table-dark table-striped">
        <thead class="table-light">
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              Name
            </th>
            <th scope="col">
              Homeworld
            </th>
            <th scope="col">
              Skin color
            </th>
          </tr>
          </thead>
          <tbody>
            {
              people.map((character, i) =>{
                return(
                  <tr >
                    <td>{i+1}</td>
                    <td>{character.name}</td>
                    <td>{character.homeworld}</td>
                    <td>{character.skin_color}</td>
                  </tr>
                )
              })
            }
        </tbody>
        </table>
      </div>
  );
}

export default App;
