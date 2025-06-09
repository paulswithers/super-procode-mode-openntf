const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        // Browser supports service workers, we're good to continue
        try {
            // Register the service worker for all content within this application
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: './' // Optional, and this is the default if you omit it
            });
            if (registration.installing) {
                // Service worker is installing
                console.log('Service worker is installing:', registration.installing);
            } else if (registration.waiting) {
                // Service worker is waiting
                console.log('Service worker is waiting:', registration.waiting);
            } else if (registration.active) {
                // Service worker is active
                console.log('Service worker is active:', registration.active);
            }
        } catch (error) {
            // Service worker registration failed
            console.error('Service worker registration failed:', error);
            
        }

    }
}

registerServiceWorker();