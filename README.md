## DNI Video Box HTML5 template

We have supplied a working example using our videobox API. For basic usage you will only need to edit the configuration settings in index.html as shown below. You will need to set the poster and media parameters to point to you static poster image and video file.

Typically all files would be uploaded to your CDN and your traffickers would use
the following iframe markup to traffic the ad. The poster and video files should be included in the HTML5 package and will be hosted on our CDN. Please refer to our specifications for file size restrictions.

#### Example ad server markup

```
#!html
<iframe src="http://your-cdn.com/demo-videobox/index.html?clickTag=[CLICK_MACRO_GOES_HERE]" height="250" width="300" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" allowtransparency="true"></iframe>

```

#### Documentation

Within the index.html file there are various configuration options that can be adjusted
to change the behavior and appearance of the video box.

The videobox API handles configuration of the HTML5 video tag and manages playback and muting audio until user interaction.

The video box can be customized to show a static 300x250 poster image before and after the video content plays.

It is also possible to change the button theme from white to black, switch off autoplay and set an autoplay delay.

```
#!JavaScript
//instantiate a new video box object with your chosen configuration parameters
var videoBox = AdOps.videobox({
    poster: 'poster.jpg', //set the static poster image filename, false for none
    media: 'video.mp4',  //set the video filename
    theme: 'white',     //set button theme to 'white' or 'black'
    autoplay: true,    //set autoplay true or false
    delay: 1500       //set autoplay delay in milliseconds, defaults to 1500 (15 seconds)
});

//initialize the videobox
videobox.init();
```

For advanced usage it is all possible to attach event listeners so you can trigger external tracking or visual effects
when the ad is ready, starts playing video or when the video completes.

The events are named as follows.

ADOPS_VIDEOBOX_READY

ADOPS_VIDEOBOX_STARTED

ADOPS_VIDEOBOX_ENDED

A convenience method is exposed via the videobox API to handle setting event listeners.

```
#!JavaScript
//Before calling videobox.init();
videoBox.addEvent('ADOPS_VIDEOBOX_READY', function() {

    //Custom code goes here for ready event
});
```
