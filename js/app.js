function getFilePath(){
$('input[type=file]').change(function () {
var filePath=$('#fileUpload').val(); 
});
}
function show(flag){
	if (flag ==-1) {
		document.getElementById("showOnSubstringReplace").style.display = 'none';
		document.getElementById("showOnStringReplace").style.display = 'none';
	}
	if (flag == 1){
		document.getElementById("showOnSubstringReplace").style.display = 'block';
		document.getElementById("showOnStringReplace").style.display = 'none';
	}
	if (flag == 2){
		document.getElementById("showOnSubstringReplace").style.display = 'none';
		document.getElementById("showOnStringReplace").style.display = 'block';
	}
}
//seleccionar y cambiar fondo de una columna nclass=a la clase de los td de la tabla
function tagnamechange(nclass){ 
	console.log(nclass);
	var ban = document.getElementById("flag");
	ban.setAttribute("value",nclass);
	var rest = document.getElementsByTagName('td');//reiniciar estilos de toda la tabla
	for (var o = rest.length - 1; o >= 0; o--) {
		rest[o].style.color='#000000';
		rest[o].style.backgroundColor='#FFFFFF';
	}
	var el = document.getElementsByClassName(nclass);//cambiar fondo de la columna
	for (var i = el.length - 1; i >= 0; i--) {
		el[i].style.color='#000';
		el[i].style.backgroundColor='#E0F2F1';
		el[i].style.hover='#E0F2F1';
	}
	//desabilitar o habilitar select de menu
	if (nclass !=-1) {
		var elm = document.getElementsByClassName("disabled"); 
	for (var p = elm.length - 1; p >= 0; p--) {
		elm[p].removeAttribute("disabled");
	}
	}else{
		var elmm = document.getElementsByClassName("disabled"); 
		for (var q = elmm.length - 1; q >= 0; q--) {
			elmm[q].setAttribute("disabled","");
		}
	}
}
//Llenar Select del menu con los nombres de las columnas
$(document).ready(function(){
 $('#load_data').click(function(){
  $.ajax({
   url:document.getElementById('file_path').value,
   dataType:"text",
   success:function(data)
   {
    console.log(location.href);
    console.log(location.search);
    var select_data = data.split(/\r?\n|\r/);
    var table_data = '<select class="browser-default" id="select"><option value="-1" id="-1" onclick="tagnamechange(-1)" selected>Selecciona una opción</option>';
    for(var count = 0; count<select_data.length; count++)
    {
     var cell_data = select_data[count].split(";");
     var num=0;
     for(var cell_count=0; cell_count<cell_data.length; cell_count++)
     {
      if(count === 0)
      {
        table_data += '<option value="'+num+'" id="'+num+'" onclick="tagnamechange(\'colm'+num+'\')">'+cell_data[cell_count]+'</option>';
          num++;
      }
      else
      {
      }
     }
    }
    table_data += '</select>';
    $('#employee_select').html(table_data);
    $('select').material_select('destroy');
    $('select').material_select();
    mostrar();
   }
  });
 });
});
      $(document).ready(function() {
      $('select').material_select();
  });
function mostrar(){
document.getElementById('showOnFileSelect').style.display = 'block';
}
//Llenar tabla con js
$(document).ready(function(){
 $('#load_data').click(function(){
  $.ajax({
   url:document.getElementById('file_path').value,
   dataType:"text",
   success:function(data)
   {
    console.log(location.href);
    console.log(location.search);
    var employee_data = data.split(/\r?\n|\r/);
    var table_data = '<table class="bordered highlight" id="datos" style="overflow-y:scroll">';
    
    for(var count = 0; count<employee_data.length; count++)
    {
	var num = 0;
     var cell_data = employee_data[count].split(";");
     table_data += '<tr>';
     for(var cell_count=0; cell_count<cell_data.length; cell_count++)
     {
      if(count === 0)
      {
       table_data += '<th>'+cell_data[cell_count]+'</th>';
      }
      else
      {
       table_data += '<td class="colm'+num+'">'+cell_data[cell_count]+'</td>';
       num++;
      }
     }
     table_data += '</tr>';
    }
    table_data += '</table>';
    $('#employee_table').html(table_data);
     corregirutf();
   }
  
  });
 });
});

//GUARDAR NUEVO CSV
function exportTableToCSV(filename) {
	spacingout();
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("n"), filename);
}
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}//

//////funciones etl
//////////////////////////////////////////////////////////////////////////////////////////////////////
function spacing(nclass){ //mostrar espacios en blanco
	console.log('nclass'+nclass);
	var spacing = document.getElementsByClassName(nclass);
	for (var u = spacing.length - 1; u >= 0; u--) {
		var str = spacing[u].innerHTML; 
    	var res = str.replace(/ /g, "<span class='dots' class='tag' style='background-color:#EF5350'>●</span>");
    	spacing[u].innerHTML = res;
	}
}
 //ocultar espacios en blanco
function spacingout(nclass){
		$(".dots").replaceWith( " " );
}
//Remover espacios en ambos lados
function removeSpaces(nclass){ 
	show('-1');
	var spaces = document.getElementsByClassName(nclass);
	spacingout();
	for (var u = spaces.length - 1; u >= 0; u--) {
		var str = spaces[u].innerHTML;
		str = str.trim();
		spaces[u].innerHTML=str;		
	}
	spacing(nclass);
}
//Remover espacios a la izquierda
function removeLeadingSpaces(nclass){ 
	show('-1');
	var spaces = document.getElementsByClassName(nclass);
	spacingout();
	for (var u = spaces.length - 1; u >= 0; u--) {
		var str = spaces[u].innerHTML;
		str = str.trimLeft();
		spaces[u].innerHTML=str;		
	}
	spacing(nclass);
}
//Remover espacios a la derecha
function removeTrailingSpaces(nclass){ 
	show('-1');
	var spaces = document.getElementsByClassName(nclass);
	spacingout();
	for (var u = spaces.length - 1; u >= 0; u--) {
		var str = spaces[u].innerHTML;
		str = str.trimRight();
		spaces[u].innerHTML=str;		
	}
	spacing(nclass);
}
//todas mayusculas nclass=a la clase de los td de la tabla
function uppercase(nclass){ 
	show('-1');
console.log('mayusculas'+nclass);
var may = document.getElementsByClassName(nclass);
console.log(may);
	for (var u = may.length - 1; u >= 0; u--) {
		var str = may[u].innerHTML;
		str = str.toUpperCase();
		may[u].innerHTML=str;
		console.log(str);
	}
}
//todas minusculas nclass=a la clase de los td de la tabla
function lowercase(nclass){ 
	show('-1');
var may = document.getElementsByClassName(nclass);
	for (var u = may.length - 1; u >= 0; u--) {
		var str = may[u].innerHTML;
		str = str.toLowerCase();
		may[u].innerHTML=str;
		console.log(str);
	}
}
//Primera letra mayuscula (inteligente)
function titlecase(nclass){ 
	show('-1');
spacingout();
var pmay = document.getElementsByClassName(nclass);
	for (var i = pmay.length - 1; i >= 0; i--) {
		var str = pmay[i].innerHTML;
		separador = " ", // un espacio en blanco
		arregloDeSubCadenas = str.split(separador);
		cadena='';
		for (var o = arregloDeSubCadenas.length - 1; o >= 0; o--) {
			if (arregloDeSubCadenas[o].toLowerCase() == 'a' || arregloDeSubCadenas[o].toLowerCase() == 'de' || 
				arregloDeSubCadenas[o].toLowerCase() == 'e' || arregloDeSubCadenas[o].toLowerCase() == 'los' || 
				arregloDeSubCadenas[o].toLowerCase() == 'del' || arregloDeSubCadenas[o].toLowerCase() == 'y' ||
				arregloDeSubCadenas[o].toLowerCase() == 'o' || arregloDeSubCadenas[o].toLowerCase() == '' || 
				arregloDeSubCadenas[o].toLowerCase() == 'la' || arregloDeSubCadenas[o].toLowerCase() == 'las' ||
				arregloDeSubCadenas[o].toLowerCase() == 'el'
				) {
				arregloDeSubCadenas[o]=arregloDeSubCadenas[o].toLowerCase();
			    cadena=arregloDeSubCadenas[o]+' '+cadena;
			}else{
				arregloDeSubCadenas[o] = arregloDeSubCadenas[o].charAt(0).toUpperCase() + arregloDeSubCadenas[o].slice(1).toLowerCase();
				cadena=arregloDeSubCadenas[o]+' '+cadena;
			}
		}
		pmay[i].innerHTML=cadena;
	}
}

//Primera letra mayuscula de cada palabra
function capitalize(nclass){ 
	show('-1');
spacingout();
var pmay = document.getElementsByClassName(nclass);
	for (var i = pmay.length - 1; i >= 0; i--) {
		var str = pmay[i].innerHTML;
		separador = " ", // un espacio en blanco
		arregloDeSubCadenas = str.split(separador);
		cadena='';
		for (var o = arregloDeSubCadenas.length - 1; o >= 0; o--) {
			
				arregloDeSubCadenas[o] = arregloDeSubCadenas[o].charAt(0).toUpperCase() + arregloDeSubCadenas[o].slice(1).toLowerCase();
				cadena=arregloDeSubCadenas[o]+' '+cadena;
			
		}
		pmay[i].innerHTML=cadena;
	}
}
//remplazar solo una palabra
function replaceSubstring(nclass,replace,replacewith){ //remplazo de substring
	//show('-1');
	spacingout();
	var remplazarsub = document.getElementsByClassName(nclass);
	for (var i = remplazarsub.length - 1; i >= 0; i--) {
		var str = remplazarsub[i].innerHTML;
		separador = " ", // un espacio en blanco
		arregloDeSubCadenas = str.split(separador);
		cadena='';
		for (var o = arregloDeSubCadenas.length - 1; o >= 0; o--) {
			if (arregloDeSubCadenas[o].trim().toLowerCase() == replace.trim().toLowerCase()) {
				arregloDeSubCadenas[o]=replacewith;
			    cadena=arregloDeSubCadenas[o]+' '+cadena;
			}else{
				arregloDeSubCadenas[o] = arregloDeSubCadenas[o];
				cadena=arregloDeSubCadenas[o]+' '+cadena;
			}
		}
		str = cadena;
		remplazarsub[i].innerHTML=str.trim();
	}
}
//remplaazar un texto completo
function replaceString(nclass,replace,replacewith){ //remplazo de cadena completa
	//show('-1');
	spacingout();

	console.log(nclass + replace + replacewith);
	var replaceString = document.getElementsByClassName(nclass);
	for (var i = replaceString.length - 1; i >= 0; i--) {
		var str = replaceString[i].innerHTML;
			if (str.trim().toLowerCase() == replace.trim().toLowerCase()) {
			str=replacewith;
			}else{
				str = str;
			}
		replaceString[i].innerHTML=str.trim();
	}
}
//ver si una columna solo tiene numeros
function validateNumbers(nclass){ //remplazo de cadena completa
	show('-1');
	console.log(nclass);
	var validar = document.getElementsByClassName(nclass);
	for (var i = validar.length - 1; i >= 0; i--) {
		var str = validar[i].innerHTML;
		if (!/^([0-9, ,.])*$/.test(str)) {//si no es un numero
			validar[i].style.backgroundColor = '#EF9A9A';
		}else{
			validar[i].style.backgroundColor = '#E0F2F1';
		}
	}
}
//ver si una columna solo tiene texto
function validateLetters(nclass){ //remplazo de cadena completa
	console.log(nclass);
	var validar = document.getElementsByClassName(nclass);
	for (var i = validar.length - 1; i >= 0; i--) {
		var str = validar[i].innerHTML;
		if (!/^([a-z,A-Z, ,á,é,í,ó,ú,Á,É,Í,Ó,Ú])*$/.test(str)) { //si no es solo es texto
			validar[i].style.backgroundColor = '#EF9A9A';
		}else{
			validar[i].style.backgroundColor = '#E0F2F1';
		}
	}
}
//remover mas de dos espcios juntos
function removeDuplicateSpaces(nclass) {
	show('-1');
 var spaces = document.getElementsByClassName(nclass);
	spacingout();
	for (var u = spaces.length - 1; u >= 0; u--) {
		var str = spaces[u].innerHTML;
		str = str.replace(/\s+/g,' ');
		spaces[u].innerHTML=str;		
	}
	spacing(nclass);
}
//Buscar
function doSearch()
    {
      var tableReg = document.getElementById('datos');
      var searchText = document.getElementById('searchTerm').value.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
      // Recorremos todas las filas con contenido de la tabla
      for (var i = 1; i < tableReg.rows.length; i++)
      {
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        found = false;
        // Recorremos todas las celdas
        for (var j = 0; j < cellsOfRow.length && !found; j++)
        {
          compareWith = cellsOfRow[j].innerHTML.toLowerCase();
          // Buscamos el texto en el contenido de la celda
          if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
          {
            found = true;
          }
        }
        if(found)
        {
          tableReg.rows[i].style.display = '';
        } else {
          // si no ha encontrado ninguna coincidencia, esconde la
          // fila de la tabla
          tableReg.rows[i].style.display = 'none';
        }
      }
    }
