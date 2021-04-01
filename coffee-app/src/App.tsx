import React, {useEffect, useState} from 'react';
import './App.css';

import PublishButton from './components/common/buttons/PrimaryButton/PrimaryButton';
import LogInButton from './components/common/buttons/SecondaryButton/secondaryButton';

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

            <PublishButton 
                text = {<b>Publish</b>}
                onButtonClick = {() => console.log("Publish btn clicked!")}
            />

            <LogInButton onButtonClick = {() => console.log("User logged in!")} >
                <b>Log in</b>
            </LogInButton>
        </div>
    );
}

export default App;
