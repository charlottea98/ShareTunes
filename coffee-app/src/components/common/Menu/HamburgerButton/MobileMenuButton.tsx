import React from 'react';
import classes from './mobileMenuButton.module.scss';

interface Props {
    showingMobileMenu: Boolean,
    onClick: () => void
}

const MobileMenuButton : React.FC<Props> = ({showingMobileMenu, onClick}) => {
    const normalClasses = [
        classes.normal1,
        classes.normal2,
        classes.normal3
    ];

    const xClasses = [
        classes.x1,
        classes.x2,
        classes.x3
    ];

    return (
        <div 
            className={classes.MobileMenuButton}
            onClick = {onClick}
        >
            {/* TODO: Gör så att knapparna tar en till rätt sida/route */}
            {
                [0, 1, 2].map(idx => (
                    <div
                        className = { !showingMobileMenu
                            ? normalClasses[idx]
                            : xClasses[idx]
                        }
                    />
                ))
            }
        </div>
    )
}

export default MobileMenuButton;