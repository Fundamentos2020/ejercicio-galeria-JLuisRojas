let maxImgs = 100;
let numImgsPorPagina = 10;
let page = 1;
let numPages = 2;

function cargarBody() {
    page = 1;
    numPages = Math.floor(maxImgs / numImgsPorPagina);

    generaPaginas();
    loadImages();
}

function loadImages() {
    var contendor_imagenes = document.getElementById("seccion_imagenes");
    //contendor_imagenes.innerHTML = "";

    const url = `https://picsum.photos/v2/list?page=${page}&limit=${numImgsPorPagina}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        try {
            if(this.status === 200) {
                const imagenes = JSON.parse(this.responseText) ;
                console.log(imagenes);

                contendor_imagenes.innerHTML = " ";

                imagenes.forEach(imagen => {
                    const htmlImg = `<div class="row contendor_imagen">
                            <div class="col-m-7 col-s-12">
                                <img src="${imagen.download_url}" class="img-fluid" alt="">
                            </div>
                            <div class="col-m-5 col-s-12">
                                <div class="info">Author: ${imagen.author}</div>
                                <div class="info">Width: ${imagen.width}</div>
                                <div class="info">Height: ${imagen.height}</div>
                                <div class="contendor_boton">
                                    <button class="boton_agregar" onclick="window.open('${imagen.url}')">Go to page</button>
                                </div>
                            </div>
                        </div>`
                    contendor_imagenes.innerHTML += htmlImg;
                });
            }
        } catch (ex) {
            var cargando = document.getElementById("cargando");
            console.log(cargando);
            cargando.innerText = "Could not load images";
        }
    }

    try {
        xhr.send();
    } catch (ex) {
        var cargando = document.getElementById("cargando");
        console.log(cargando);
        cargando.innerText = "Could not load images";
    }
}

function generaPaginas() {
    var pages = document.getElementById("mas_paginas");
    pages.innerHTML = "";

    let htmlPag = "";
    for(var i = 0; i < numPages; i++) {
        if(i === 0) {
            htmlPag += `
                <div class="pagina pagina_actual" onclick="ClickEnPagina(this);">${i+1}</div>
            `;
        } else {
            htmlPag += `
                <div class="pagina" onclick="ClickEnPagina(this);">${i+1}</div>
            `;
        }
    }

    htmlPag += `
        <div class="pagina" onclick="ClickEnPagina(this);">Next ></div>
    `;

    pages.innerHTML = htmlPag;
}

function ClickEnPagina(e) {
    window.scrollTo(0, 0); 
    var pages = document.getElementById("mas_paginas");
    pages.children[page-1].classList = "pagina";

    if(e.innerText === "Next >") {
        if (page < numPages) {
            page++;
        }
    } else {
        page = e.innerText;
    }

    pages.children[page-1].classList = "pagina pagina_actual";

    loadImages();
}

function OnChangeNumber(e) {
    console.log("hola");
    
    numImgsPorPagina = e.value;
    page = 1;
    numPages = Math.floor(maxImgs / numImgsPorPagina);
    
    generaPaginas();
    loadImages();
}