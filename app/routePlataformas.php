<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use App\Service\PlataformaService;

return function (App $app) {

    $app->group('/plataformas',
        function (RouteCollectorProxy $group) {

            //Get all plataforms
            $group->get('',
                function (Request $request, Response $response) {
                    try {
                        $service = new PlataformaService();
                        $data = $service->retrieve();
                        return utilResponse($response, $data, 200);
                    }catch (Exception $ex){
                        return utilResponse($response, ['message' => $ex ->getMessage()], 500);
                    }
                }
            );

            //Delete platform by id
            $group->delete('/{idPlatform}',
                function (Request $request, Response $response) {
                    $id = (int)$request->getAttribute('idPlatform');
                    try {
                        $service = new PlataformaService();
                        if (!$service->exist($id))
                            return utilResponse($response, ['message' => 'Plataforma: '.$id.' no existe'], 404);
                        $service->deleteById($id);
                    }catch (PDOInitializeException $ex){
                        return utilResponse($response, ['message' => $ex ->getMessage()], 500);
                    }catch (Exception $ex){
                        return utilResponse($response, ['message' => $ex ->getMessage()], 400);
                    }
                    return utilResponse($response, ['message' => 'Plataforma: '.$id.' se elimino correctamente'], 200);
                }
            );

            //Update platform
            $group->put('/{idPlatform}',
                function (Request $request, Response $response) {
                    $id = (int)$request->getAttribute('idPlatform');
                    try {
                        $service = new PlataformaService();
                        if (!$service->exist($id))
                            return utilResponse($response, ['message' => 'Plataforma: '.$id.' no existe'], 404);
                        $body = $request->withParsedBody(json_decode(file_get_contents('php://input'), true))->getParsedBody();
                        $service->updateById($id, $body);
                    }catch (PDOInitializeException $ex){
                        return utilResponse($response, ['message' => $ex ->getMessage()], 500);
                    }catch (Exception $ex){
                        return utilResponse($response, ['message' => $ex ->getMessage()], 400);
                    }
                    return utilResponse($response, ['message' => 'Plataforma: '.$id.' actualizada correctamente'], 200);
                }
            );

            //Create plataform
            $group->post('',
                function (Request $request, Response $response) {
                    try{
                        $service = new PlataformaService();
                        $body = $request->withParsedBody(json_decode(file_get_contents('php://input'), true))->getParsedBody();
                        $service->create($body);
                    }catch (PDOInitializeException $ex){
                        return utilResponse($response, ['message' => $ex ->getMessage()], 500);
                    }catch (Exception $ex){
                        return utilResponse($response, ['message' => $ex ->getMessage()], 400);
                    }
                    return utilResponse($response, ['message' => 'Plataforma creada correctamente'], 200);
                }
            );
        }
    );
};