<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite(['resources/css/app.css','resources/scss/app.scss'])
    @php($rootURL='http://127.0.0.1:8000/')
</head>
<body>
<div class="top-bar">
    <a href='{{$rootURL . 'login'}}'>Login</a>
    <a href='{{$rootURL . 'cousine'}}'>Recipes</a>
    <a href='{{$rootURL . 'cousine/add-recipe'}}'>Add Recipe</a>
    <a href='{{$rootURL . 'cousine/add-ingredient'}}'>Add Ingredient</a>
    <a href='{{$rootURL . 'cousine/update-ingredient'}}'>Add Ingredient</a>
    <div class="messagae">{{$TopBarMessage ?? ''}}</div>
</div>
    @yield("mainContent")
</body>
</html>