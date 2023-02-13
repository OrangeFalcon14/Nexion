<script>
import { user_avatar, username_store, password_store } from "../../store/settings";

let showPsswdChangeBox = false;

let old_password = "", password = "";

let msg = "";

function savePsswd() {
    console.log(old_password, $password_store);
    console.log(password);
    if (old_password !== $password_store) msg = "Passwords do not match!";
    else {
        password_store.set(password);
        msg = "Password changed!";
    }
}
</script>

<div class="users-container">
    <img src={$user_avatar} alt="">
    <br>
    <div class="bar-button">Name <span class="right">{$username_store}</span></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="bar-button" on:click|self={() => showPsswdChangeBox = !showPsswdChangeBox}>Password 
        <span class="right">**** 󰏫</span>
        {#if showPsswdChangeBox}
            <div class="change-psswd">
                <label for="old_password_input">Old Password: </label>
                <input type="text" name="old_password_input" id="old_password_input" placeholder="Leave blank if not set" bind:value={old_password} />
                <label for="password_input">New Password: </label>
                <input type="text" name="password_input" id="password_input" bind:value={password} />
                <button on:click={savePsswd}>Save</button>
                <div class="msg" class:success={msg === "Password changed!"}>{msg}</div>
            </div>
        {/if}
    </div>
</div>

<style>
img{
    display: block;
    width: 10em;
    margin: 0 auto;
    border-radius: 50%;
}
.bar-button{
    background: var(--color1);
    color: white;
    padding: 1.5em 2em;
    border: none;
    text-align: left;
    font-size: 1rem;
    font-family: Ubuntu;
    transition: all 0.2s ease-in;
}
.bar-button:is(:hover, :focus){
    filter:brightness(150%) saturate(70%);
}
.bar-button .right{
    float: right;
}
.bar-button:first-of-type{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.bar-button:last-of-type{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.change-psswd{
    font-size: 0.95rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--accent-color);
    display: grid;
    grid-template-columns: 33% 1fr;
    align-items: center;
}

.change-psswd input{
    background: var(--color2);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    font-size: 1em;
    margin-bottom: 10px;
    color: white;
    transition: 0.2s all ease-in;
}
.change-psswd input:focus{
    border: 2px solid var(--accent-color);
}

.change-psswd button{
    background: var(--accent-color);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    color: white;
    transition: 0.2s all ease-in;    
    display: inline;
    filter: brightness(100%);
}
.change-psswd button:hover{
    opacity: 0.8;
}
.change-psswd button:is(:active, :focus){
    border: 2px solid var(--accent-color);
}

.change-psswd .msg{
    text-align: center;
    color: #ff2946;
}
.change-psswd .msg.success{
    color: #00FF7A;
}
</style>
