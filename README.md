# Available on App Store and Google Play ratings widget

This is a real simple jQuery plugin that allows you to add to your site a widget that displays:

  - App Store and Google Play app download links
  - Rating in both stores
  - Just that

It uses jQuery to get data about your application in both stores and localStorage to cache the data.

### Version
0.0.1

### Tech

* [iTunes Search API](http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html) For the App Store rating, there is the iTunes Search API where you can get info about your app. Read more on [Stackoverflow](https://github.com/username/repo/blob/branch/docs/more_words.md)
* [42matters API](https://42matters.com/api/lookup) There is no Google Play API that you can use in Javascript, so I had to use this API to get Google Play app rating.
* [localStorage](http://www.w3schools.com/html/html5_webstorage.asp) In order to aboid requesting both apis everytime that you load a page I've used localStorage to cache this data. Of course, this is client cache, so if you load the page in different browsers it will request again the data. But, it is better than nothing!

### Installation

Just download the files and them to the head of your HTML page:

```sh
<link rel="stylesheet" type="text/css" href="ratings.css">
<script type="text/javascript" src="ratings.js"></script>
```

Then, you need to create a div inside your HTML that will where the widget will be display:

```sh
<div class="clearfix" id="gmail"></div>
```

Finally you need to initiate the plugin in your DIV. Here you need to pass some data about your application as options.

```sh
$(document).ready(function(){
    $("#gmail").ratings({idApple: '422689480', idAndroid: 'com.google.android.gm', cache: false});
})
```

Options
```sh
idApple: yourAppleAppId,
idAndroid: yourAndroidAppId,
mattersApiToken: your42MattersApiToken
```

To get Android reviews working you need to get and [API token from 42matters](https://42matters.com/user/register?goto=/api/lookup)

### Limitations
 - 42matters has a daily limit of 3000 requests

### Development

Want to contribute? Great!

Do your changes / improvements and make me a pull request :)

### Todos

 - Add another stores
 - Allow to pass ratings text as option
 - Format reviews count
 
License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [marked]: <https://github.com/chjj/marked>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   
   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>


