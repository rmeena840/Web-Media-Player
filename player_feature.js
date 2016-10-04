window.addEventListener('load',function(){
   video=document.getElementById('video');
   playbutton=document.getElementById('play_button');
   pbar_container=document.getElementById('pbar_container');
   soundbutton=document.getElementById('soundbutton');
   fullscreenbutton=document.getElementById('fullscreenbutton');
   soundchange=document.getElementById('sound_container');
   soundbar=document.getElementById('sbar');
   video.load();
   video.addEventListener('canplay',function(){
   playbutton.addEventListener('click',playpause,false);
   pbar_container.addEventListener('click',skip,false);
   fullscreenbutton.addEventListener('click',fullscreen,false);
   soundbutton.addEventListener('click',mute,false);
   soundchange.addEventListener('click',changevol,false);
   },false);
},false);

function playpause(){
  if(video.paused){
    video.play();
    playbutton.src="images/pause.jpg";
    update=setInterval(updateprogressbar,30);
  }else{
    video.pause();
    playbutton.src="images/play.png";
    window.clearInterval(update);
  }
}

function updateprogressbar(){
  var time=(video.currentTime/video.duration)*100;
  pbar.style.width=time+'%';
  if(video.ended){
    window.clearInterval(update);
    playbutton.src="images/replay.png";
  }
}

function skip(ev){
  var mouseX=ev.pageX-pbar_container.offsetLeft;
  var width=window.getComputedStyle(pbar_container).getPropertyValue('width');
  width=parseFloat(width.substr(0,width.length-2));
  video.currentTime=(mouseX/width)*video.duration;
  updateprogressbar();
}

function mute(){
  if(video.muted){
      video.muted=false;
      soundbutton.src="images/volume.png";
      soundbar.style.width='50%';
  }else{
    video.muted=true;
    soundbutton.src="images/mute.png";
    soundbar.style.width='0%';
  }
}


function changevol(ev){
    var mouseX=ev.pageX-soundchange.offsetLeft;
    var width=window.getComputedStyle(soundchange).getPropertyValue('width');
    width=parseFloat(width.substr(0,width.length-2));
    video.volume=mouseX/width;
    soundbar.style.width=(mouseX/width)*100+'%';
    if(mouseX==0){
      video.muted=true;
      soundbutton.src="images/mute.png";
    }else{
      video.muted=false;
      soundbutton.src="images/volume.png";
    }
}

function fullscreen(){
  if(video.requestFullscreen){
    video.requestFullscreen();
  }else if(video.webkitRequestFullscreen){
    video.webkitRequestFullscreen();
  }else if(video.mozRequestFullscreen){
    video.webkitRequestFullscreen();
  }else if(video.msRequestFullscreen){
    video.webkitRequestFullscreen();
  }
}
