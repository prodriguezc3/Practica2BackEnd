//Paula Rodriguez Cubas y Sarah Rojas

const handler = async (req: Request): Promise <Response> => {

    type producto = {
        id: number,
        name: string,
        precio: number,
    };
    
    
    const productos = [
        { id: 1, nombre: 'Producto A', precio: 30 },
        { id: 2, nombre: 'Producto B', precio: 20 },
        { id: 3, nombre: 'Producto C', precio: 50 },
        { id: 4, nombre: 'Producto D', precio: 10 },
    
    ];
    
    const method = req.method; //para pedir el tipo de metodo: GET, POST, DELETE, PUT
    const url = new URL(req.url);
    const path = url.pathname;
    const searchParam = url.searchParams;
    
    
    if(method==="GET"){
        const prodMIN = searchParam.get("minPrecio");
        const prodMAX = searchParam.get("maxPrecio");
        const prodID = searchParam.get("id");
       
    
    //ruta 1: Devuelve todos los productos. Permite filtrar por un rango de precios usando SearchParams.
                if(path === "/productos"){
                    if (searchParam.get("minPrecio") && searchParam.get("maxPrecio")){
                        const aux1 = productos.filter((productos) => productos.precio>=Number(prodMIN) && productos.precio<=Number(prodMAX));
                        return new Response(JSON.stringify(aux1));
                    } else if (searchParam.get("minPrecio")){
                    const aux2 = productos.filter((productos) => productos.precio >= Number(prodMIN));
                    return new Response (JSON.stringify(aux2));
                    } else if(searchParam.get("maxPrecio")){
                        const aux3 = productos.filter((productos) => productos.precio<=Number(prodMAX));
                        return new Response(JSON.stringify(aux3));
                    } 
                    
    //ruta 2: Esta ruta permite obtener la información de un producto específico usando el id del producto como parámetro en la URL.
                    else if(searchParam.get("id")){ 
                        const aux4 = productos.filter((productos) => productos.id === Number(prodID));
                        return new Response(JSON.stringify(aux4));
                    }   
    /*ruta 3: Esta ruta debe calcular el precio promedio de todos los productos. También puede aceptar un parámetro opcional para calcular el 
    promedio solo de productos dentro de un rango de precios.*/
                } else if (path === "/calcular-promedio"){
                    if (searchParam.get("minPrecio") && searchParam.get("maxPrecio")){
                        //productos.filter((productos) => productos.precio>=Number(prodMIN) && productos.precio<=Number(prodMAX));
                        
                        const aux5 = productos.filter((productos) => productos.precio>=Number(prodMIN) && productos.precio<=Number(prodMAX));
                        let promedio1:number =0;
                        aux5.forEach((elem) => {
                            
                            promedio1 =promedio1+ elem.precio;
                        
                        
                        });
                        
                        promedio1=promedio1/(aux5.length);


                        return new Response(JSON.stringify(promedio1));
                        
                    } else if (searchParam.get("minPrecio")){
                    const aux6 = productos.filter((productos) => productos.precio >= Number(prodMIN));
                    let promedio2:number =0;
                        aux6.forEach((elem) => {
                            
                            promedio2 =promedio2+ elem.precio;
                        
                        
                        });
                        
                        promedio2=promedio2/(aux6.length);


                        return new Response(JSON.stringify(promedio2));
                    } else if(searchParam.get("maxPrecio")){
                        const aux7 = productos.filter((productos) => productos.precio<=Number(prodMAX));
                        let promedio3:number =0;
                        aux7.forEach((elem) => {
                            
                            promedio3 =promedio3+ elem.precio;
                        
                        
                        });
                        
                        promedio3=promedio3/(aux7.length);


                        return new Response(JSON.stringify(promedio3));
                    } 
                }
    
           
    
        }
        return new Response(`La ruta ${path} no existe`, {status:404});
    
    }
    
    Deno.serve({port:3000}, handler);
    //deno run mainP2.ts
