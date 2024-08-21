import './App.css';
// import MyClass from './Components/MyClass';
import MyFunction from './Components/MyFunction';
// import MyEvents from './Components/MyEvents';
import MyForm from './Components/MyForm';
// import MyConditional from './Components/MyConditional';
import MyList from './Components/MyList';

function App() {
  return (
    <div className="App1">
      {/* <MyClass /> */}
      <hr />
      <MyFunction />
      <hr />
      {/* <MyEvents />  */}
      <hr />
      <MyForm />
      <hr />
      {/* <MyConditional userType={'admin'} isLoggedIn={false}/> */}
      <hr />
      <MyList/>
    </div>
  );
}

export default App;