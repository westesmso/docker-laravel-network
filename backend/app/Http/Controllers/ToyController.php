<?php

namespace App\Http\Controllers;

use App\Models\Toy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ToyController extends Controller
{
    public function index(): JsonResponse
    {
        $toys = Toy::query()->orderByDesc('id')->get();

        return response()->json($toys);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $toy = Toy::create($validated);

        return response()->json($toy, 201);
    }

    public function destroy(Toy $toy): JsonResponse
    {
        $toy->stock -= 1;
        $toy->save();

        return response()->json(status: 204);
    }
}
