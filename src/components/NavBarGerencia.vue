<template>
    <nav class="navbar">
        <div class="navbar__wrapper">
            <h1 class="navbar__logo">
                <img src="../assets/images/b3-social-logo.png" alt="">
            </h1>

            <div class="navbar__user">
                <p class="navbar__user-name">Olá Leandro!</p>
                <img src="../assets/images/letra-p.png" alt="" class="navbar__user-picture">
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
.navbar {
    background-color: #ffffff;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.navbar__wrapper {
    max-width: 1100px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0;
    align-items: center;
    justify-content: space-between;
}

.navbar__logo {
    width: 15%;
    margin: 0;
}

.navbar__logo img {
    width: 75%;
    display: block;
    margin: 0;
}

.navbar__items {
    width: 60%;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    align-items: center;
    justify-content: space-evenly;
    padding: .75rem 2rem;
    margin: 0;
}

.navbar__items .navbar__item {
    text-decoration: none;
    color: #000000;
}

.navbar__user {
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.navbar__user .navbar__user-name {
    width: 50%;
    margin: 0;
    font-weight: 600;
    text-align: right;
}

.navbar__user .navbar__user-picture {
    position: relative;
    width: 30%;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    padding: .3rem;
    border: 2.5px solid #00145f;
}
</style>