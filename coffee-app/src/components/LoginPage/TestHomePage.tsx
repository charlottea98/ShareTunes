import React from 'react';

type Props = {
    handleLogout: any
}

const TestHomePage : React.FC<Props> = ({handleLogout}) => {
    return (
        <section>
            <nav>
                <h2>
                    Welcome
                </h2>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </section>
    )
}

export default TestHomePage;