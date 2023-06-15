const scroll = () => {
    window.addEventListener('scroll', function() {
        // Obtener la altura total del documento, incluyendo el desplazamiento vertical
        var documentHeight = document.documentElement.scrollHeight;
      
        // Obtener la altura visible de la ventana del navegador
        var windowHeight = window.innerHeight;
      
        // Obtener la posición actual del desplazamiento vertical
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
        // Calcular la distancia restante para llegar al final de la página
        var remainingDistance = documentHeight - (windowHeight + scrollTop);
      
        // Verificar si se ha llegado al final de la página
        if (remainingDistance <= 0) {
          // Aquí puedes realizar las acciones que desees cuando se llegue al final de la página
          return true
        } else {
            return false
        }
      });
}

export default scroll;