<?php

use Carbon\Carbon;

/**
 * genereate expire Date Base On Specifiec Date
 */
function generateExpireDate(string $fromDate, int $days): Carbon
{
    return Carbon::parse($fromDate)->addDays($days);
}
