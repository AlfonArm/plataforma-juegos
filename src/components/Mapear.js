const Mapear = (tipo, lista) => {
    if ((tipo == "genero")||(tipo == "plataforma")) {
        return (
            <div>
                {lista.map ((indice, elemento) => {
                    return (
                        <div className={tipo}>
                            <li className= {tipo+"_name"} key={indice}>{elemento}</li>
                        </div>
                     );
                })
                }
            </div>
        )
    } else {
        return (
            <div>
                {lista.map ((elemento, indice) => {
                    return (
                        <div className={tipo}>
                            <li className= {tipo+"_name"} key={indice}>{elemento}</li>
                        </div>
                     );
                })
                }
            </div>
        )
    }
}

export default Mapear;