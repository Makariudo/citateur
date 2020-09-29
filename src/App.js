
import React, { Component } from 'react'
import './App.css'
import Citation from './components/Citation'

class App extends Component {


state = {
  citation : "Citation à venir",
  info : "bloc info",
  motapi: "",
  recuptext: "",
  auteur: ""
}

componentDidMount = () => {
  this.reinit();
}

componentDidUpdate = () => {
}

async trouvemot() {
  fetch('https://api.dicolink.com/v1/mots/motauhasard?avecdef=false&minlong=5&maxlong=7&verbeconjugue=false&api_key=EAX0bR2KdabAnaoTNRxGQCMUk8NwCFod')
  .then(res => res.json())
  .then((api) => {
    let mot = api[0].mot
    mot = mot.toUpperCase()
    console.log(mot);
    this.setState({ motApi: mot })
    this.trouveCitation(mot);
  })
  
  .catch(console.log)
  }


  async trouveCitation(mot) {
    fetch(`https://api.dicolink.com/v1/mot/${mot}/citations?limite=5&api_key=EAX0bR2KdabAnaoTNRxGQCMUk8NwCFod`)
    .then(res => res.json())
    .then((citation) => {
      if (citation.error) {
        this.trouvemot();
      }
      else {
      console.log(citation);
      let newCitation = citation[0];
      console.log(newCitation)
      this.setState( {citation : newCitation.citation })
      this.setState( {auteur : newCitation.auteur })

      }
    })
    .catch(console.log)
    }

async reinit() {
  await(this.trouvemot())
}

  render () {

    return (
      <div className='App_container'>
         <header className='App_header'>
          <h1>Citateur</h1>
          <h2>Distributeur de citations</h2>
        </header>
        <main>
          <section>
            <h3>Citation du jour :</h3>
            <Citation citation={this.state.citation} auteur={this.state.auteur}/>
          </section>
        </main>
        <footer>
          Citateur.com
        </footer> 
      </div>
    )
  }
}

export default App;
