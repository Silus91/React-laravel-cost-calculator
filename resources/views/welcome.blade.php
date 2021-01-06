<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Magic Bubble Calculator</title>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
        <link rel="icon" href="{{ URL::asset('favicon.ico') }}" type="image/x-icon"/>
        <link type="image/x-icon" rel="apple-touch-icon" href="favicon.ico" />

        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />

    </head>
    <body>
        <div id="app"></div>
    <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
