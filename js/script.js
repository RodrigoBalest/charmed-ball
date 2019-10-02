if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./js/sw.js')
    .then(function() {
      console.log("Service Worker registered successfully");
    })
    .catch(function() {
      console.log("Service worker registration failed");
    });
}

function geraPalavras() {
  var chars = $('#caracteres').val();
  var num = $('#num').val();
  var out = '';
  var nChars = chars.length;
  var iChars = 0;
  var indexes = [];
  var regex = $('#regex').val();
  
  try {
    regex = new RegExp(regex);
  } catch(e) {
    regex = false;
  }
  
  if (num > nChars) {
    alert('O número de letras deve ser igual ou menor que o número de caracteres.');
    return false;
  }
  
  $('pre').text("\n");
  
  // Inicializa os índices
  for (var i=0; i<num; i++) {
    indexes.push(i);
  }
  
  do {
    // Imprime a string de acordo com os índices
    for (var k=0; k<indexes.length; k++) {
      out += chars[indexes[k]];
    }

    if (regex && out.match(regex)) {
      $('pre').append(out + "\n");
    }
    out = '';

    // Incrementa os índices
    indexes = incrementa(indexes, nChars, indexes.length - 1);
  } while(indexes);
}

function incrementa(indexes, max, i) {
  var len = indexes.length;
  var maxVal;
  var maxPos;
  
  do {
    indexes[i]++;
  } while(indexes.slice(0, i).indexOf(indexes[i]) >=0 && indexes[i] <= max);
  if (indexes[i] >= max) {
    if (i === 0) {
      return false;
    }
    if (incrementa(indexes, max, i-1) === false) {
      return false;
    }
    indexes[i] = -1;
    do {
      indexes[i]++;
    } while(indexes.slice(0, i).indexOf(indexes[i]) >=0);
  }
  return indexes;
}

$(function () {
  $('#form').on('submit', function (ev) {
    ev.preventDefault();
    geraPalavras();
  });
});
