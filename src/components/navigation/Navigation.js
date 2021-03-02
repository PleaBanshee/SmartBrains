import React from 'react';

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}> {/* position nav at top right corner of page */}
            <p className="f3 link dim black underline pa3 pointer">Sign out</p>
        </nav>
    )
}

export default Navigation;