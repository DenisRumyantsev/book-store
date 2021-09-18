import React from 'react';

const Footer = () => {
    return (
        <footer class="page-footer grey darken-3">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 style={{ color: 'orangered', fontWeight: 600 }}>A K V E L O N</h5>
                        <ul>
                            <li class="grey-text text-lighten-4">Developer: Denis Rumyantsev</li>
                            <li class="grey-text text-lighten-4">Phone number: 89632155045</li>
                            <li class="grey-text text-lighten-4">Email: denis.rumyantsev@akvelon.com</li>
                        </ul>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Resources</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="https://materializecss.com">https://materializecss.com</a></li>
                            <li><a class="grey-text text-lighten-3" href="https://www.w3schools.com">https://www.w3schools.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright grey darken-2">
                <div class="container">
                    © 2021 Copyright
                    <a class="grey-text text-lighten-4 right" href="/">Home</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
