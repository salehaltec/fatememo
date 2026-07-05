import React from 'react';
import ReactDOM from 'react-dom/client';

import BusinessCheck from './components/BusinessCheck';

const app = document.getElementById('app');

if (app) {
    const page = app.dataset.page;

    if (page === 'business-check') {
        ReactDOM.createRoot(app).render(
            <React.StrictMode>
                <BusinessCheck />
            </React.StrictMode>
        );
    }
}
