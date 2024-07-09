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
    <a href="{{$rootURL . 'login'}}">{{__('topBar.login')}}</a>
    <a href="{{$rootURL . 'cousine'}}">{{__('topBar.recipes')}}</a>
    <a href="{{$rootURL . 'cousine/add-recipe'}}">{{__('topBar.add-recipe')}}</a>
    <a href="{{$rootURL . 'cousine/add-ingredient'}}">{{__('topBar.add-ingredient')}}</a>
    <a href="{{$rootURL . 'cousine/update-ingredient'}}">{{__('topBar.update-ingredient')}}</a>
    <select id="language-selection">
        <option value="en" {{App::isLocale('en') ? 'selected':''}} >{{__('topBar.english')}}</option>
        <option value="pl" {{App::isLocale('pl') ? 'selected':''}} >{{__('topBar.polish')}}</option>
    </select>
    <div class="message">{{$TopBarMessage ?? ''}}</div>
</div>
    @yield("mainContent")
</body>
</html>