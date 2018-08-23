import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import ErrorBoundary from './catch.js'




ReactDOM.render(
	<ErrorBoundary>
<App /></ErrorBoundary>
, document.getElementById('root'),function(){console.log(this.props);
	if(!(this.props.children.toString)){
  alert('not loaded index')
}
});

window.gm_authFailure = function (){

     alert('Error In Map Load')
     document.querySelector('.gm-err-container').innerHTML = `<h1>Error with authentication</h1>
     <h2> Cannot display map</h2>`

   }