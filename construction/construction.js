let toggle = true;

function viewportHandler(event) {

    let trickSonarLint = event.origin;
    if (event.origin !== trickSonarLint) return;

    if (window.devicePixelRatio <= 0.35 && toggle) {
        let a = document.createElement('audio');
        a.autoplay = true;
        a.src = '../assets/construction/snd/vine_boom.ogg';
        a.id = 'easter-egg';
        document.getElementsByTagName('BODY')[0]?.appendChild(a);

        toggle = false;
    }

    if (window.devicePixelRatio > 0.35 && !toggle) {
        document.getElementById('easter-egg')?.remove();

        toggle = true;
    }
}

window.visualViewport?.addEventListener('scroll', viewportHandler);
window.visualViewport?.addEventListener('resize', viewportHandler);
