var synth = new Tone.FMSynth().toMaster()

function triggerSynth(time){
	synth.triggerAttackRelease('C4','16n', time)
}

Tone.Transport.schedule(triggerSynth, 0)
Tone.Transport.schedule(triggerSynth, 2 * Tone.Time('8t'))
Tone.Transport.schedule(triggerSynth, Tone.Time('4n') + Tone.Time('8t'))
Tone.Transport.schedule(triggerSynth, Tone.Time('4n') + 2 * Tone.Time('8t'))

//start/stop the transport
//document.querySelector('tone-play-toggle').addEventListener('change', e => Tone.Transport.toggle())
Tone.Transport.toggle()

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert("Reached");
            }
        }
    }
    rawFile.send(null);
}

fetch('http://127.0.0.1:8887/new_song.json')
  .then(response => response.json())
  .then(jsonResponse => alert(jsonResponse))
