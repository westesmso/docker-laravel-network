<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ToyStoreBasicAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $username = env('TOYSHOP_BASIC_USER', 'admin');
        $password = env('TOYSHOP_BASIC_PASSWORD', 'toy123');

        if ($request->getUser() !== $username || $request->getPassword() !== $password) {
            return response('Unauthorized', 401, [
                'WWW-Authenticate' => 'Basic realm="Toy Store API"',
            ]);
        }

        return $next($request);
    }
}
