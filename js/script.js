var robotState = $('#robot-state');
var motionBar = $('#motionBar');
var noiseBar = $('#noiseBar');
var tempBar = $('#tempBar');
var patrolBtn = $('#go-patrol');
var guardBtn = $('#guard-em');
var cycleTime = $('#cycle-time');
var timerText = $('#timer');
var patrolTime = $('#patrol-time');
var guardTime = $('#guard-time');
var pEdit = $('#ptime-edit');
var gEdit = $('#gtime-edit');
var setupBtn = $('#setup');
var stopBtn = $('#stop');
var currentCommand = '';
var state = 0;
var motion = 0;
var noise = 0;
var temp = 0;
var cycle = 0;
var timer = 0;
function setState() {
    if (state === 0) {
        robotState.text("Standby");
    } else if (state === 1) {
        robotState.text("Patrolling");
    } else if (state === 2) {
        robotState.text("Guarding");
    } else if (state === 3) {
        robotState.text("Setting Up");
    } else if (state === 4) {
        robotState.text("Error");
    } else {
        robotState.text("undefined");
    }
}
setInterval(function() {
        $.ajax({
                url: 'http://10.32.176.4/chemical-x'
            })
            .done(function(data) {
                if (currentCommand !== data) {
                    var dataValue = data.split(" ");
                    state = parseInt(dataValue[0]);
                    motion = parseInt(dataValue[1]);
                    noise = parseInt(dataValue[2]);
                    temp = parseInt(dataValue[3]);
                    cycle = parseInt(dataValue[4]);

                    setState();

                    if (motionBar.val() !== motion) {
                        motionBar.val(motion);
                    }
                    if (noiseBar.val() !== noise) {
                        noiseBar.val(noise);
                    }
                    if (tempBar.val() !== temp) {
                        tempBar.val(temp);
                    }
                    if (cycleTime !== cycle) {
                        cycleTime.text(cycle);
                    }
                }
                if (state === 1) {
                    if (timer >= patrolTime.val()) {
                        guardBtn.click();
                    }
                } else if (state === 2) {
                    if (timer >= guardTime.val()) {
                        patrolBtn.click();

                    }
                }
                timerText.text(timer);
                timer++;
                currentCommand = data;
            });
    }, 1000),
    patrolBtn.click(function() {
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 1 + " " + motion + " " + noise + " " + temp + " " + cycle + "/set"
        });
        setState();
        timer = 0;
    }),

    guardBtn.click(function() {
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 2 + " " + motion + " " + noise + " " + temp + " " + cycle + "/set"
        });
        setState();
        timer = 0;
    }),

    setupBtn.click(function() {
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 3 + " " + motion + " " + noise + " " + temp + " " + cycle + "/set"
        });
        setState();
        timer = 0;
    }),

    stopBtn.click(function() {
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 0 + " " + motion + " " + noise + " " + temp + " " + cycle + "/set"
        });
        setState();
        timer = 0;
    }),

    pEdit.click(function() {
      if(patrolTime.prop('disabled')) {
        patrolTime.prop('disabled', false);
        pEdit.text("Ok");
      } else {
        patrolTime.prop('disabled', true);
        pEdit.text("Edit");
      }
    }),

    gEdit.click(function() {

    });
