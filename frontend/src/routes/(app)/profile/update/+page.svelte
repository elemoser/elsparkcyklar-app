<script>
    export let data;
    const { user } = data;
</script>

<div class="update-container">
    <h1>Update user</h1>
    <form method="POST" action="?/update">
        <input id="id" name="id" type="hidden" value="{user.id}" required>

        <label for="fname">Förnamn</label>
        <input id="fname" name="fname" type="text" placeholder="{user.first_name}"/>
    
        <label for="lname">Efternamn</label>
        <input id="lname" name="lname" type="text" placeholder="{user.last_name}"/>
    
        <label for="phone">Telefonnummer</label>
        <input id="phone" name="phone" type="tel" placeholder="{user.phone}"/>
    
        <label for="email">E-post</label>
        <input id="email" name="email" type="email" placeholder="{user.mail}" />
    
        <label for="pw">Lösenord</label>
        <input id="pw" name="pw" type="password" placeholder="**************" required />
    
        <input type="submit" value="Update"/>
    </form>
</div>

<style lang="scss">
    .update-container {
        display: flex;
        flex-direction: column;
        align-items: center;
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

		&[type='submit']:hover {
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
					background-color: darken(#f0f0f0, 5%); //temp color for effect.
				}
			}
		}
	}
</style>