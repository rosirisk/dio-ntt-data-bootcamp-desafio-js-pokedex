window.onload = getPokemons();


function getPokemons() {
    const div = document.getElementById('pokemons');
    for (var i = 1; i <= 20; i++) {
         getCard(i).then((pokemon) => {
            div.innerHTML += pokemon
        });
    }
}

function getCard(id) {
    types = "";
    const card =  getData(id).then((data) => {
        li = `<li class="pokemon" onclick="showModal(${data.id})">
                    <span class="number">#00${data.id}</span>
                    <span class="name">${data.name}</span>
                    <div class="detail">
                        <ol class="types">`;

        for (t of data.types) {
            types = types + `<li class="type">${t.type.name}</li>`
        }

        li = li + types;
        li = li + `</ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg"
                    alt="${data.name}">
                </div>`;
        return li;
    });
    return card;

}

function getData(id) {
    const pokemon =  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
        "body": null,
        "method": "GET",
        "mode": "cors",
    })
        .then((response) => response.json())
        .then((data) => data)
    return pokemon;

}


function showModal(id) {

    modal.style.display = "block";
    getPokemonDetail(id);
}

function getPokemonDetail(id) {
    const modalDetail = document.getElementById('pokemon-detail');
    const detail = getData(id).then((data) => {
        types="";
        div = `<div class="pokemon-modal-container">
            <span class="name">${data.name}</span>
            <span class="number">#00${data.id}</span>
        <div class="detail">
        <ol class="types">`;

        for (t of data.types) {
            types = types + `<li class="type">${t.type.name}</li>`
        }

        div = div + types;
        div = div + `</ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg"
                    alt="${data.name}">
                </div>`;


        // return div;
        modalDetail.innerHTML = div;
    })
    console.log(modalDetail)
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


//clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}