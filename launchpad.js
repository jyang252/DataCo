//Install launchpad - skip registration
console.log(navigator);
let device;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function failure() {
    console.log("Could not connect MIDI");
}

function updateDevices(event) {
    console.log(event);
}

function success(midiAccess) {
//    console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);
    let inputs = midiAccess.inputs;
//    console.log(inputs);

    for (let output of midiAccess.outputs.values()) {
        device = output;
        console.log('Output device selected', device);
    }

    inputs.forEach((input) => {
//    console.log(input);
    input.addEventListener('midimessage', handleInput);
});

}

function handleInput(input) {
//    console.log(input);
    let command = input.data[0];
    let note = input.data[1];
    let velocity = input.data[2];

    console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);

    if (velocity > 0) {
        noteOn(note);
    }

    if (velocity == 0) {
        noteOff(note);
    }
}

function noteOn(note) {
    //console.log(`note:${note} // on`);

    if ( note == 99) {

        document.getElementById('hello_tag').textContent = "Block created"
        colorM(note,104);
        colorM(note-1,13);
        colorM(note-2,13);
        colorM(note-3,13);
        colorM(note-4,13);
        colorM(note-8,13);
        colorM(note-12,13);
        colorM(note-5,13);
        colorM(note-10,13);
        colorM(note-15,13);
    }
}

function noteOff(note) {
    //console.log(`note:${note} // off`);

    if (note == 99){

        document.getElementById('hello_tag').textContent = "Block creation kit"
        colorM(note,0);
        colorM(note-1,0);
        colorM(note-2,0);
        colorM(note-3,0);
        colorM(note-4,0);
        colorM(note-8,0);
        colorM(note-12,0);
        colorM(note-5,0);
        colorM(note-10,0);
        colorM(note-15,0);
    }
}

function colorM(key,clr) {
    device && device.send([0x90,key,clr]);
}