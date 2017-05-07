/*
 * Cookie Notification v1.0.2
 * http://webgadgets.net/plugins/cookie-notification
 *
 * Copyright 2017, WebGadgets
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2017-01-22
 *
 */
jQuery.wgCookiesNotification = function (options) {
    // default settings:
    var defaults = {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        width: null,
        titleText: 'This website uses "cookies" to give you the best possible user experience.',
        acceptButton: 'Accept',
        readMoreButton: 'More info',
        cookiePolicyLink: null,
        linkColor: null,
        backgroundColor:'#3C3C3C',
        color:'#fff',
        buttonBackgroundColor:'#5cb85c',
        buttonColor:'#fff'
    };
    var settings = $.extend({}, defaults, options);


    var cookies_notification_var = readCookie("cookies_notification");

    if (cookies_notification_var != 1) {
        if (settings.bottom === 'auto' && settings.top === 'auto' && settings.left === 'auto' && settings.right === 'auto') {
            settings.bottom = 0;
            settings.left = 0;
            settings.right = 0;
        }
        $('body').append('<div id="cookies-notification"></div>');
        var cn = $('#cookies-notification');
        cn.append('<span class="titleText">' + settings.titleText + '</span>');
        if (settings.cookiePolicyLink !== null) {
            if (settings.linkColor === null) {
                settings.linkColor = settings.color;
            }
            $('#cookies-notification .titleText').append(' <a class="readMoreButton" target="_blank" style="color:' + settings.linkColor + ';">' + settings.readMoreButton + '</a>');
            $('#cookies-notification .readMoreButton').attr('href',settings.cookiePolicyLink);
        }
        cn.append('<span class="acceptButton">' + settings.acceptButton + '</span>');
        $('#cookies-notification .acceptButton').css({
            'background-color': settings.buttonBackgroundColor,
            color:settings.buttonColor,
            'border-radius': '4px',
            cursor: 'pointer',
            padding: '6px 12px',
            float:'right',
            'line-height': '1'
        });
        cn.css({
            top: settings.top,
            bottom: settings.bottom,
            left: settings.left,
            right: settings.right,
            position: 'fixed',
            'background-color': settings.backgroundColor,
            color:settings.color,
            width:settings.width,
            'font-family': 'arial',
            'font-size': '13px',
            padding: '10px 30px',
            'line-height': '1.42857',
            'max-width':'100%'
        });

        $(document).on('click','#cookies-notification .acceptButton', function (){
            var x = 12 * 20; //or whatever offset
            var CurrentDate = new Date();
            CurrentDate.setMonth(CurrentDate.getMonth() + x);
            document.cookie = "cookies_notification=1; expires=" + CurrentDate + ";path=/";
            $('#cookies-notification').remove();
        });
    }


    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};