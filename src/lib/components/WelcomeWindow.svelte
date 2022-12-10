<div class="window-container">
    <div class="content-container">
        <h1>Welcome to Nexion!</h1>

        <p style="text-align: center; color: #ddd">Nexion is an online desktop inspired by <a href="https://www.gnome.org/">GNOME</a>.</p>
        <br>
        <h2>Before you start</h2>
        <ul style="list-style-type:square">
            <li>Enter fullscreen mode</li>
            <li>Zoom out intil this welcome window is completely visible.</li>
        </ul>

        <h2>My aim</h2>
        <p>To create a beautiful extensible portable online desktop that looks consistent wherever you go.</p>
        <p>Contributions are welcome. Refer the README for more details</p>

        <footer>
            <a href="https://github.com/OrangeFalcon14/Nexion"> GitHub</a>
        </footer>
    </div>
</div>

<style>
.window-container{
    height: calc(100% - 50px);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: auto;
    user-select: auto;
    font-size: 20px;
    padding: 0px;
    box-sizing: border-box;
    color: #eee;
}
.window-container>*{
    box-sizing: border-box;
}
.content-container{
    padding: 0px 10rem;
    height: calc(100% - 32px);
}
h1{
    text-align: center;
    font-size: 3rem;
    font-weight: 1000;
    background: -webkit-linear-gradient(45deg, #526e9c, #fa001b);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
h1:after{
    content: "";
    display: block;
    background: -webkit-linear-gradient(45deg, #526e9c, #fa001b);
    max-width: 16.5ch;
    width: 0;
    height: 5px;
    position: absolute;
    left: 27%;
    /* translate: -50%; */
    transition: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
h1:hover:after{
    width: 100%;
}
h2{
    background: -webkit-linear-gradient(45deg, #526e9c, #fa001b);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

a{
    background: -webkit-linear-gradient(45deg, #526e9c, #fa001b);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    transition: all 0.2s;
}
a:hover{
    cursor: pointer;
    opacity: 0.7
}

footer{
    margin-top: 5rem;
    padding: 2rem;
    border-top: 1px solid #aaa;
    width: 100%;
    text-align: center;
}
</style>
