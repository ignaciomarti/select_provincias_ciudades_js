window.onload = function(){

  // // En caso de querer persistir un dato tomado de la Base de Datos con PHP (Más adelante se persisten estos datos):
  // let provinciaSeleccionada = "<?php echo $provincia_seleccionada ?? '' ?>";
  // let ciudadSeleccionada = "<?php echo $ciudad_seleccionada ?? '' ?>";
  
  function mostrarCiudades(valorProvincia){
  fetch("https://apis.datos.gob.ar/georef/api/localidades?provincia=" + valorProvincia + "&max=5000")
    .then( function(response){
        return response.json();
    })
    .then( function(data){
      let ciudades = data.localidades;
      
      // Ordeno alfabeticamente las ciudades
      let ciudadesOrdenadas = [];
          for (const key in ciudades) {
              ciudadesOrdenadas.push(ciudades[key].nombre);
              ciudadesOrdenadas.sort();

          }

        // Select
        let selectCiudades = document.getElementById("ciudad");

        // Options
        for (const key in ciudadesOrdenadas) {
            let optionCiudad = document.createElement("option");
            let textoDelOptionCiudad = "";

            textoDelOptionCiudad = document.createTextNode(ciudadesOrdenadas[key]);
            optionCiudad.append(textoDelOptionCiudad);
            optionCiudad.setAttribute("value", ciudadesOrdenadas[key]);

            // // Opción de persistencia de datos tomados de la BBDD utilizando PHP
            // if (ciudadSeleccionada === ciudadesOrdenadas[key]) {
            //       optionCiudad.setAttribute("selected", "selected");
            //   }
            selectCiudades.append(optionCiudad);
        }
    })
    .catch(function(error){
        console.log("El error fue " + error);
    });
}
function actualizarProvincias(){
fetch('https://apis.datos.gob.ar/georef/api/provincias')
  .then( function(response){
  return response.json();
  })
  .then( function(data){
  let provincias = data.provincias;

  // Ordeno provincias alfabeticamente
  let provinciasOrdenadas = [];
  for (const key in provincias) {
      provinciasOrdenadas.push(provincias[key].nombre);
      provinciasOrdenadas.sort();
  }

  // Select
  let selectProvincias = document.getElementById("provincia");

  // Options
  for (const key in provinciasOrdenadas) {
      let optionProvincia = document.createElement("option");
      let textoDelOptionProvincia = "";

      textoDelOptionProvincia = document.createTextNode(provinciasOrdenadas[key]);

      optionProvincia.append(textoDelOptionProvincia);
      optionProvincia.setAttribute("value", provinciasOrdenadas[key])

      // Opción de persistencia de datos tomados de la BBDD utilizando PHP
      // if (provinciaSeleccionada === provinciasOrdenadas[key]) {
      //     optionProvincia.setAttribute("selected", "selected");

      //     let provinciaSeleccionada = optionProvincia.value;
      //     for (const key in provincias) {
      //         if (provincias[key].nombre == provinciaSeleccionada){
      //             let indiceProvinciaSeleccionada = provincias[key].id;
      //             let selectCiudades = document.getElementById("ciudad");
      //             selectCiudades.innerHTML = '';
      //             mostrarCiudades(indiceProvinciaSeleccionada);
      //         }
      //         }
      // }
      selectProvincias.append(optionProvincia);
  }

    selectProvincias.addEventListener("change", function(){
      let provinciaSeleccionada = selectProvincias.value;

      for (const key in provincias) {
        if (provincias[key].nombre == provinciaSeleccionada){
          let indiceProvinciaSeleccionada = provincias[key].id;
          let selectCiudades = document.getElementById("ciudad");
          selectCiudades.innerHTML = '';
          mostrarCiudades(indiceProvinciaSeleccionada);
        }
      }
    });
  })
  .catch(function(error){
  console.log("Hubo un error. " + error);
  });
  }
  actualizarProvincias();


}