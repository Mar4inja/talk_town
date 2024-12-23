import React from 'react';
import './App.css'; // Jūsu stili
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Redux Persist
import { store, persistor } from './app/store'; // Importē Redux store un persistor
import MyRoutes from './Routes'; // Jūsu maršruti
import { BrowserRouter as Router } from 'react-router-dom'; // React Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stili
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';


// Komponentes App
const App = () => {
    return (
        <Provider store={store}> {/* Pārvalda Redux store */}
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}> 
                {/* Redux Persist - ielādes indikators kamēr atjauno stāvokli */}
                <Router> 
                    <div className="appContainer">
                        <MyRoutes /> {/* Maršruti */}
                    </div>
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default App;
