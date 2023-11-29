<script>
	import { app_name } from '$lib/index.js';

    //TODO Add functionality for creating a user and for logging in a user. form action = X if login or Y if register.
    //TODO Add Phone nr to register form?

	let register = false;
    let btnValue = 'Registrera';
    let textContent = 'Inte medlem? ';

    function toggleRegister() {
        register = !register;
        btnValue = register ? 'Logga in' : 'Registrera';
        textContent = register ? 'Redan medlem? ' : 'Inte medlem? ';
    }

</script>

<div class="login-wrapper">
    <div class="form-div">
        <h1>{app_name}</h1>

        {#if register}
            <form method="POST" action="">
                <label for="fname">Förnamn</label>
                <input id="fname" type="text" required />
                <label for="lname">Efternamn</label>
                <input id="lname" type="text" required />
                <label for="email">E-post</label>
                <input id="email" type="email" required />
                <label for="pw">Lösenord</label>
                <input id="pw" type="password" required />
                <input type="button" value="Registrera" />
            </form>
        {:else}
            <form method="POST" action="">
                <label for="email">E-post</label>
                <input id="email" type="email" required />
                <label for="pw">Lösenord</label>
                <input id="pw" type="password" required />
                <input type="button" value="Logga in" />
            </form>
        {/if}
        <div class="text-div">
            <p>{textContent}</p>
            <label>
                <input type="button" value={btnValue} on:click={toggleRegister} />
            </label>
        </div>
    </div>
</div>

<style lang='scss'>
    h1 {
        /*color: $contrast-color;*/ //Alternativ design med mörk bakgrund
        text-align: center;
        font-weight: 700;
        font-size: 4em;
    }

    label {
        font-size: $base-font-size;
        font-family: $text-font;
        font-weight: 600;
    }

    input {
        display: block;
        font-size: $base-font-size;
        padding: 0.2em 0.3em;
        border-radius: 0.25em;
        border: 1px solid #333;

        &[type=button]:hover {
            cursor: pointer;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        label {
            &::after {
                content: ':';
            }
        }

        input {
            margin-bottom: calc($calculated-line-height / 2);

            &:nth-last-child(2) {
                margin-bottom: $calculated-line-height;
            }

            &:last-child {
                align-self: flex-end;
                &:hover {
                    background-color: darken(#F0F0F0, 5%); //temp color for effect.
                }
            }
        }
    }

    .login-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        //background-color: $dark-color; Samma som med h1an (alternativt tema)
    }

    .text-div {
        display: flex;
        align-items: center;

        p {
            margin-bottom: unset;
        }

        input {
            background-color: unset;
            border: unset;
            text-decoration: underline;
            &:hover {
                text-decoration: none;
            }
        }
    }

</style>
