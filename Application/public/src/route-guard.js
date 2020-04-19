(() => {
    const isAuth = getStorage('isAuth');
    if (!isAuth) {
        logout();
        alert('Log in to use the website.');
        window.location.href = '/index.html';
    }
})();