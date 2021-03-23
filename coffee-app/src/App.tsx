import React, {useEffect, useState} from 'react';
import './App.css';

const App : React.FC = () => {
    const [coffeeData, setCoffeeData] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/charlottea98/CoffeeApp/coffees")
            .then(res => res.json())
            .then(data => {
                setCoffeeData(JSON.stringify(data));
            })

    });

    return (
        <div className="App">
            {coffeeData}
        </div>
    );
}

export default App;
