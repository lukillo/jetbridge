import React ,{ Component } from "react";
import Axios from 'axios';

class BasicTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            people: []
        }
    }

    handleChange = async (event)=>{
        if (event.target.value.length >= 1){
          Axios({
            url: `https://swapi.dev/api/people/?search=${event.target.value}`,
          })
            .then((response) => {
              if (response.status != 200) throw new Error('swapi call error');
              if(response.data.results.length > 0) {
                this.setState({people: response.data.results});
              }  
              
            })
            .catch((error) => {
              console.log(error);
          });
        }
    }

    render(){
        return( 
            <div className="flex flex-col">
            <div className="input-group mb-4">
            <div className="input-group-prepend">
                <div className="input-group mb-4" style={{width: '120%'}}>
                <input type="text" className="form-control" 
                placeholder="Type an StarWars character" 
                aria-label="Type an StarWars character" 
                aria-describedby="basic-addon2" onChange={this.handleChange}>
                </input>
                </div>
            </div>  
            </div>
            <table className="table table-dark table-striped">
            <thead className="table-light">
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
                    this.state.people?.map((character, i) =>{
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
        )
    }
}

export default BasicTable;