
import React, { Component } from 'react'
import './App.css'
import Citation from './components/Citation'

class App extends Component {


state = {
  citation : "Citation à venir...",
  info : "bloc info",
  motapi: "",
  recuptext: "",
  auteur: ""
}
componentDidMount() {
  this.init()
}

componentDidUpdate = () => {
}

init(){
  let xhr = new XMLHttpRequest();
  let recuptext = "";
  xhr.open('GET', 'https://citations.ouest-france.fr/apis/export.php?json&key=464fzer5&t=');
// request state change event
  xhr.onload = () => {
  // request completed?
  if (xhr.readyState !== 4) return;
  if (xhr.status === 200) {
    // request successful - show response
    recuptext = xhr.responseText;
    this.setState({ recuptext })
    this.transformationtext(this.state.recuptext)

  }
  else {
    // request error
    console.log('HTTP error', xhr.status, xhr.statusText);
  }
};
// start request
  xhr.send();
}

transformationtext(text) {
  let texttab = text.split( ":" )
  this.trouveAuteur(texttab)
  this.trouveCitation(texttab)
  
}


trouveAuteur = (texttab) => {
  let auteur = "";
  let auteurtab = texttab[3].split(",")
  auteur = auteurtab[0]
  let longueurAuteur = auteur.length
  auteur=auteur.substr(1,(longueurAuteur-2))
  this.setState( {auteur })
}

trouveCitation = (texttab) => {
  let citation = texttab[2];
  let longueurCitation = citation.length
  citation=citation.substr(0,(longueurCitation-7))
  citation=citation.normalize('NFKD')
  this.setState( { citation })
} 




/* async trouvecit() {
  fetch('https://citations.ouest-france.fr/apis/export.php?json&key=464fzer5&t=')
  .then(res=>console.log(res))
  // .then(res => res.json())
  .then((citation) => {
    console.log(citation)
  })
  
  .catch(console.log)
  } */

  render () {
    /* this.trouvecit() */

   
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

export default App
