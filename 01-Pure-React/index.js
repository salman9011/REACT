console.log(React);

// const container = document.getElementById("container");
// const h1 = React.createElement("h1",{id : "root"},"Hello React");
// ReactDOM.render(h1,container); // will render the whole h1 to container , kind of append



//lets do with the functions
function createElements(){ 
const h1= React.createElement("h1",{},"Hello Word!!!");
const button = React.createElement("button",{},"Get Advice!")
const parent = React.createElement("div",{id:"test"},h1,button)
const container =document.getElementById("container");
ReactDOM.render(parent,container);
}

createElements();

//lets get new advice from api on clicking this button//
//this was how pure react works and now lets setup dev environment and et advices on apis

