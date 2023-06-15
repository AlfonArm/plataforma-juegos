let observador = new IntersectionObserver ((entradas) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting) {
            let n = 1;
            // acá se deberían mandar la función que digo para que se ponga a mapear tal que
            // función de cargar algo
            
        }
    })
    }, {
        rootMargin: '0px 0px 0px 0px',
        thresold: 1.0
    }
)
