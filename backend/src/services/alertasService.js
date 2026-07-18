import alertasRepository from "../repositories/alertasRepository.js";
import ticketsRepository from "../repositories/ticketsRepository.js";


/*
|--------------------------------------------------------------------------
| Verificar consumo completo
|--------------------------------------------------------------------------
*/

const verificarConsumo = async (connection, data) => {


    /*
    |--------------------------------------------------------------------------
    | Tolerancias del sistema
    |--------------------------------------------------------------------------
    */

    const TOLERANCIA_COMBUSTIBLE = 2;

    const TOLERANCIA_RENDIMIENTO = 4;



    /*
    |--------------------------------------------------------------------------
    | Guardar alertas generadas
    |--------------------------------------------------------------------------
    */

    let alertasGeneradas = [];



    /*
    |--------------------------------------------------------------------------
    | 1. VALIDAR DIFERENCIA DE COMBUSTIBLE
    |--------------------------------------------------------------------------
    */


    const diferenciaCombustible =

        Number(data.diferencia);



    if (diferenciaCombustible > TOLERANCIA_COMBUSTIBLE) {


        const descripcion =

            `Se detectó una diferencia de `
            +
            `${diferenciaCombustible.toFixed(2)} litros `
            +
            `entre el combustible teórico y el registrado en tablero. `
            +
            `Supera la tolerancia permitida de ${TOLERANCIA_COMBUSTIBLE} litros.`;



        /*
        |--------------------------------------------------------------------------
        | Crear anomalía
        |--------------------------------------------------------------------------
        */

        const anomalia =

            await alertasRepository.createAnomalia(
                connection,
                {

                    id_ticket:
                        data.id_ticket,

                    id_solicitud:
                        data.id_solicitud,

                    descripcion,

                    notificado:0

                }
            );



        /*
        |--------------------------------------------------------------------------
        | Crear alerta
        |--------------------------------------------------------------------------
        */

        const alerta =

            await alertasRepository.createAlerta(
                connection,
                {

                    id_unidad:
                        data.id_unidad,

                    tipo_alerta:
                        "DIFERENCIA_COMBUSTIBLE",

                    descripcion,

                    estado:
                        "pendiente",


                    detalle:
                    {

                        id_ticket:
                            data.id_ticket,

                        id_consumo:
                            data.id_consumo,

                        diferencia:
                            diferenciaCombustible,

                        tolerancia:
                            TOLERANCIA_COMBUSTIBLE

                    }

                }
            );



        /*
        |--------------------------------------------------------------------------
        | Crear ticket de revisión
        |--------------------------------------------------------------------------
        */

        const ticketAlerta =

            await alertasRepository.createTicketAlerta(
                connection,
                {

                    id_consumo:
                        data.id_consumo

                }
            );



        alertasGeneradas.push({

            tipo:
                "DIFERENCIA_COMBUSTIBLE",

            anomalia,

            alerta,

            ticketAlerta

        });


    }




    /*
    |--------------------------------------------------------------------------
    | 2. VALIDAR RENDIMIENTO
    |--------------------------------------------------------------------------
    */


    const rendimientoActual =

        Number(data.rendimiento);



    /*
    |--------------------------------------------------------------------------
    | Obtener promedio histórico
    |--------------------------------------------------------------------------
    */


    const promedioHistorico =

        await ticketsRepository.getPromedioRendimientoUnidad(
            connection,
            data.id_unidad
        );



    /*
    |--------------------------------------------------------------------------
    | Si existe historial comparar
    |--------------------------------------------------------------------------
    */

    if (

        promedioHistorico > 0

        &&

        rendimientoActual > 0

    ) {


        const diferenciaRendimiento =

            promedioHistorico

            -

            rendimientoActual;



        if (

            diferenciaRendimiento >= TOLERANCIA_RENDIMIENTO

        ) {


            const descripcion =


                `Se detectó bajo rendimiento de combustible. `

                +

                `Rendimiento actual: `
                +
                `${rendimientoActual.toFixed(2)} km/L. `

                +

                `Promedio histórico: `
                +
                `${promedioHistorico.toFixed(2)} km/L. `

                +

                `Diferencia: `
                +
                `${diferenciaRendimiento.toFixed(2)} km/L.`;


            /*
            |--------------------------------------------------------------------------
            | Crear anomalía
            |--------------------------------------------------------------------------
            */


            const anomalia =

                await alertasRepository.createAnomalia(
                    connection,
                    {

                        id_ticket:
                            data.id_ticket,

                        id_solicitud:
                            data.id_solicitud,

                        descripcion,

                        notificado:0

                    }
                );



            /*
            |--------------------------------------------------------------------------
            | Crear alerta rendimiento
            |--------------------------------------------------------------------------
            */


            const alerta =

                await alertasRepository.createAlerta(
                    connection,
                    {

                        id_unidad:
                            data.id_unidad,


                        tipo_alerta:
                            "BAJO_RENDIMIENTO",


                        descripcion,


                        estado:
                            "pendiente",


                        detalle:
                        {

                            id_ticket:
                                data.id_ticket,


                            id_consumo:
                                data.id_consumo,


                            rendimiento_actual:
                                rendimientoActual,


                            promedio_historico:
                                promedioHistorico,


                            diferencia:
                                diferenciaRendimiento,


                            tolerancia:
                                TOLERANCIA_RENDIMIENTO

                        }

                    }
                );



            /*
            |--------------------------------------------------------------------------
            | Crear ticket revisión
            |--------------------------------------------------------------------------
            */


            const ticketAlerta =

                await alertasRepository.createTicketAlerta(
                    connection,
                    {

                        id_consumo:
                            data.id_consumo

                    }
                );



            alertasGeneradas.push({

                tipo:
                    "BAJO_RENDIMIENTO",

                anomalia,

                alerta,

                ticketAlerta

            });


        }


    }



    /*
    |--------------------------------------------------------------------------
    | Resultado
    |--------------------------------------------------------------------------
    */


    return {


        tieneAlertas:

            alertasGeneradas.length > 0,


        alertas:

            alertasGeneradas


    };


};



export default {


    verificarConsumo


};