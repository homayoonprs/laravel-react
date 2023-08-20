<?php

namespace App\Support;

use Illuminate\Support\Str;

/**
 * Class InternalOperation is responsible to handle the operation ID which is useful for inter-communication.
 */
class InternalOperation
{
    /**
     * @var string|null
     */
    private static ?string $operationId = null;

    /**
     * @return string
     */
    public static function getOperationId(): string
    {
        if (is_null(self::$operationId)) {
            try {
                self::$operationId = Str::uuid()->toString();
            } catch (\Exception $exception) {
                self::$operationId = 'NONE';
            }
        }

        return self::$operationId;
    }
}
