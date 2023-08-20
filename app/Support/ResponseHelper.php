<?php

namespace App\Support;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

class ResponseHelper
{
    /**
     * @param array $errors
     * @return JsonResponse
     */
    public static function getValidationResponse(array $errors): JsonResponse
    {
        $errors = array_map(function ($error) {
            return Arr::first($error);
        }, $errors);

        return self::getErrorResponse(422, 'VALIDATION_FAILED', $errors);
    }

    /**
     * @param \Throwable $exception
     * @return JsonResponse
     */
    public static function getExceptionResponse(\Throwable $exception): JsonResponse
    {
        $errors = [];

        if (config('app.debug')) {
            $errors = [
                get_class($exception) => $exception->getMessage(),
                'File' => $exception->getFile(),
                'Line' => $exception->getLine(),
            ];
        }

        return self::getErrorResponse(500, 'UNEXPECTED_EXCEPTION', $errors);
    }

    /**
     * @param int $code
     * @param string $message
     * @param array $errors
     * @param int|null $statusCode
     * @return JsonResponse
     */
    public static function getErrorResponse(
        int $code,
        string $message,
        array $errors,
        int $statusCode = null
    ): JsonResponse {
        return response()->json(
            [
                'operationId' => InternalOperation::getOperationId(),
                'error' => [
                    'code' => $code,
                    'message' => $message,
                    'errors' => $errors,
                ],
            ],
            $statusCode ?? $code
        );
    }

    /**
     * @param  mixed  $data
     * @param  int  $statusCode
     * @param  array  $headers
     * @param  int  $options
     * @return JsonResponse
     */
    public static function getSuccessResponse(
        mixed $data,
        int $statusCode = 200,
        array $headers = [],
        int $options = 0
    ): JsonResponse {
        return response()->json(
            ['operationId' => InternalOperation::getOperationId(), 'data' => $data],
            $statusCode,
            $headers,
            $options
        );
    }

    /**
     * @param array $data
     * @return JsonResponse
     */
    public static function getCachedResponse(array $data): JsonResponse
    {
        return response()->json($data);
    }

    /**
     * @param  LengthAwarePaginator  $paginator
     * @param  int  $offset
     * @param  array  $data
     * @param  int  $statusCode
     * @param  array  $headers
     * @param  int  $options
     * @return JsonResponse
     */
    public static function getPaginationResponse(
        LengthAwarePaginator $paginator,
        int $offset,
        array $data,
        int $statusCode = 200,
        array $headers = [],
        int $options = 0
    ): JsonResponse {
        return self::getSuccessResponse([
                'totalResults' => $paginator->total(),
                'resultsPerPage' => $paginator->perPage(),
                'currentResultsCount' => count($paginator->items()),
                'currentResultsOffset' => $offset,
            ] + $data, $statusCode, $headers, $options);
    }
}
