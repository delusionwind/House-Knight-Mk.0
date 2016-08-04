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
var houseStatus = $('#houseStatus');
var threats = $('#threats');
var history = $('#history');
var currentCommand = '';
var state = 0;
var motion = 0;
var noise = 0;
var temp = 0;
var cycle = 0;
var timer = 0;
var counting = false;
var threatLevel = 0;


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

                    setState();
                    threatLevel = 0;

                    if (motionBar.val() !== motion) {
                        motionBar.val(motion);
                    }
                    if (noiseBar.val() !== noise) {
                        noiseBar.val(noise);
                    }
                    if (tempBar.val() !== temp) {
                        tempBar.val(temp);
                    }

                    if (motion > 40) {
                        threatLevel++;
                    }
                    if (noise > 40) {
                        threatLevel++;
                    }
                    if (temp > 40) {
                        threatLevel++;
                    }

                    var date = new Date();
                    var now = date.toUTCString();

                    if (motion > 40 && noise > 40 && temp > 40) {
                        threats.html("");
                    } else if (motion > 40 && noise > 40) {

                    } else if (motion > 40 && temp > 40) {

                    } else if (noise > 40 && temp > 40) {

                    } else if (motion > 40) {

                    } else if (noise > 40) {

                    } else if (temp > 40) {

                    }

                    if (motion > 40 || noise > 40 || temp > 40) {
                        history.append(threats.text() + "\n");
                        history.scrollTop(history[0].scrollHeight);
                    }

                    if (threatLevel >= 2) {
                        houseStatus.text("Dangerous");
                        alert("Your house might be in danger!");
                    } else if (threatLevel >= 1) {
                        houseStatus.text("Alert");
                    } else {
                        houseStatus.text("Normal");
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
            url: 'http://10.32.176.4/chemical-x/' + 1 + " " + motion + " " + noise + " " + temp + " " //+ "/set"
        });
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 1 + " " + motion + " " + noise + " " + temp + "/set"
        });
        setState();
        timer = 0;
    }),

    guardBtn.click(function() {
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 2 + " " + motion + " " + noise + " " + temp + " " //+ "/set"
        });
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 2 + " " + motion + " " + noise + " " + temp + "/set"
        });
        setState();
        timer = 0;
    }),

    setupBtn.click(function() {
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 3 + " " + motion + " " + noise + " " + temp + " " //+ "/set"
        });
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 3 + " " + motion + " " + noise + " " + temp + "/set"
        });
        setState();
        counting = true;
        timer = 0;
    }),

    stopBtn.click(function() {
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 0 + " " + motion + " " + noise + " " + temp + " " //+ "/set"
        });
        $.ajax({
            url: 'http://10.32.176.4/chemical-x/' + 0 + " " + motion + " " + noise + " " + temp + "/set"
        });
        setState();
        if (counting === true) {
            $('#cycle-time').text(timer);
            counting = false;
        }
        timer = 0;
    }),

    pEdit.click(function() {
        if (patrolTime.prop('disabled')) {
            patrolTime.prop('disabled', false);
            pEdit.text("Ok");
        } else {
            patrolTime.prop('disabled', true);
            pEdit.text("Edit");
        }
    }),

    gEdit.click(function() {
        if (guardTime.prop('disabled')) {
            guardTime.prop('disabled', false);
            gEdit.text("Ok");
        } else {
            guardTime.prop('disabled', true);
            gEdit.text("Edit");
        }
    });
